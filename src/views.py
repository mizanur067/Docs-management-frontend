from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .Serializers import ProductSerializer
from rest_framework import status
from django.http import HttpResponse
from .models import user_photo
from PIL import Image
from io import BytesIO
# Create your views here.
@api_view(['POST'])
def photo_upload(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'data': serializer.data ,'status':'success'}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST']) 
def resize_image(request):
    from PIL import Image
    import os
    id=request.data.get('id')
    input_image = user_photo.objects.get(id=id).photo.path
    print("Input image path:", input_image)
    width = int( request.data.get('width'))
    height = int(request.data.get('height'))
    dpi = int(request.data.get('dpi'))
    max_size_kb = int(request.data.get('max_size_kb'))

    img = Image.open(input_image)

    if width == 0:
        width = img.width
    if height == 0:
        height = img.height

    if dpi == 0:
        dpi = img.info.get('dpi', (72, 72))[0]

    if max_size_kb == 0:
       max_size_kb = os.path.getsize(input_image) / 1024

    base_name, ext = os.path.splitext(img.filename)
    output_image_path = f"{base_name}_resized{ext}"

    def format_image(
        img,
        output_path,
        width,
        height,
        dpi,
        max_file_size_kb
    ):
        img = img.resize((width, height), Image.LANCZOS)

        quality = 100  # start with high quality

        while quality >= 10:
            img.save(
                output_path,
                format="JPEG",
                quality=quality,
                dpi=(dpi, dpi),
                optimize=True
            )

            file_size_kb = os.path.getsize(output_path) / 1024

            if file_size_kb <= max_file_size_kb:
                return True

            quality -= 5

        return False

    success = format_image(
        img,
        output_image_path,
        width,
        height,
        dpi,
        max_size_kb
    )

    if success:
        return Response({'message': 'Image resized successfully', 'output_image': output_image_path,'status':'success'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Failed to resize image within the specified constraints'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def imgToPdf(request):

    image_files = request.FILES.getlist('images')

    if not image_files:
        return Response(
            {"error": "No images uploaded"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if len(image_files) > 10:
        return Response(
            {"error": "Maximum 10 images allowed"},
            status=status.HTTP_400_BAD_REQUEST
        )

    fixed_width = 1200

    processed_images = []

    try:
        for file in image_files:
            fixed_width=max(fixed_width, Image.open(file).width)
        for file in image_files:

            img = Image.open(file)

            # Maintain aspect ratio
            ratio = fixed_width / img.width
            new_height = int(img.height * ratio)

            img_resized = (
                img.resize((fixed_width, new_height), Image.LANCZOS)
                   .convert('RGB')
            )

            processed_images.append(img_resized)

        # Create PDF in memory instead of saving to disk
        pdf_buffer = BytesIO()

        first_image = processed_images[0]
        rest_images = processed_images[1:]

        first_image.save(
            pdf_buffer,
            format="PDF",
            save_all=True,
            append_images=rest_images
        )

        pdf_buffer.seek(0)

        response = HttpResponse(
            pdf_buffer,
            content_type='application/pdf'
        )

        response['Content-Disposition'] = 'attachment; filename="converted.pdf"'

        return response

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )