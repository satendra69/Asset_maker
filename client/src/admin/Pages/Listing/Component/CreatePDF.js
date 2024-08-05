import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import httpCommon from "../../../../http-common";

const CreatePDF = ({ propertyData, storedGalleryImages }) => {
    const createPdfDocument = async () => {
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();

            const { width, height } = page.getSize();
            let y = height - 50;
            const fontSize = 12;

            // Title
            page.drawText(`Title: ${propertyData.title}`, { x: 50, y, size: 20 });
            y -= 30;

            // Property Owner
            page.drawText(`Property Owner: ${propertyData.propertyOwner}`, { x: 50, y, size: fontSize });
            y -= 20;

            // Type
            page.drawText(`Type: ${propertyData.type}`, { x: 50, y, size: fontSize });
            y -= 20;

            // Region
            page.drawText(`Region: ${propertyData.region}`, { x: 50, y, size: fontSize });
            y -= 20;

            // Category
            page.drawText(`Category: ${propertyData.category}`, { x: 50, y, size: fontSize });
            y -= 20;

            if (propertyData.type === 'Apartments') {
                // Sale Price
                page.drawText(`Sale Price: ${propertyData.apartmentDetails.salePrice}`, { x: 50, y, size: fontSize });
                y -= 20;

                // Description
                page.drawText(`Description: ${propertyData.apartmentDetails.content}`, { x: 50, y, size: fontSize });
                y -= 20;

                // Location
                page.drawText(`Location: ${propertyData.apartmentDetails.locationData.address}`, { x: 50, y, size: fontSize });
                y -= 20;

                // About Project/Builder
                page.drawText(`About Project/Builder: ${propertyData.apartmentDetails.projectBuilderDetails}`, { x: 50, y, size: fontSize });
                y -= 20;

                // Amenities
                page.drawText(`Amenities: ${propertyData.apartmentDetails.amenitiesAsString}`, { x: 50, y, size: fontSize });
                y -= 20;

                // Video URL
                page.drawText(`Video URL: ${propertyData.apartmentDetails.videoUrl}`, { x: 50, y, size: fontSize });
                y -= 20;

                // Featured
                if (propertyData.apartmentDetails.featured) {
                    page.drawText('*', { x: 50, y, size: fontSize, color: rgb(1, 0, 0) });
                    y -= 20;
                }

                // Gallery Images
                y = await addStoredImagesToPdf(pdfDoc, page, storedGalleryImages, y);
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${propertyData.title}.pdf`;
            link.click();
        } catch (error) {
            console.error("Error creating PDF:", error);
        }
    };

    const addStoredImagesToPdf = async (pdfDoc, page, images, y) => {
        for (let image of images) {
            const formattedPath = image.attachment.replace(/\\/g, '/');
            const imageUrl = `${httpCommon.defaults.baseURL}${formattedPath}`;
            try {
                const imageBytes = await fetch(imageUrl).then((res) => res.arrayBuffer());
                const embeddedImage = await pdfDoc.embedJpg(imageBytes);
                const { width: imgWidth, height: imgHeight } = embeddedImage.scale(0.25);
                page.drawImage(embeddedImage, {
                    x: 50,
                    y: y - imgHeight - 20,
                    width: imgWidth,
                    height: imgHeight,
                });
                y -= imgHeight + 30;
            } catch (error) {
                console.error(`Error loading stored image: ${error}`);
            }
        }
        return y;
    };

    return (
        <div>
            <button onClick={createPdfDocument}>Create PDF</button>
        </div>
    );
};

export default CreatePDF;
