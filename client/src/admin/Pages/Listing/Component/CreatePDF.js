import { useEffect } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'; // Import StandardFonts
import httpCommon from '../../../../http-common';

const CreatePDF = ({ createPDFInsert }) => {
    console.log('createPDFInsert:', createPDFInsert);

    useEffect(() => {
        const createPdfDocument = async () => {
            try {
                // Validate createPDFInsert
                if (!createPDFInsert || Object.keys(createPDFInsert).length === 0) {
                    console.error('Error: createPDFInsert is invalid or empty.');
                    return;
                }

                const pdfDoc = await PDFDocument.create();
                let page = pdfDoc.addPage();
                const { width, height } = page.getSize();
                let y = height - 50;
                const fontSize = 12;
                const lineHeight = fontSize + 4;
                const margin = 50;

                const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
                const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

                const drawBoldText = (text, x, y, size) => {
                    page.drawText(text, { x, y, size, font: helveticaBoldFont, color: rgb(0, 0, 0) });
                    return y - lineHeight;
                };

                const drawTextWithWrap = (text, x, y, size) => {
                    text = text.replace(/<\/?[^>]+(>|$)/g, "");
                    const lines = text.split('\n');
                    for (const line of lines) {
                        const words = line.split(' ');
                        let lineContent = '';
                        for (const word of words) {
                            const testLine = lineContent + word + ' ';
                            const testWidth = (lineContent.length + word.length + 1) * size * 0.5;

                            if (testWidth > width - x - margin) {
                                if (y - lineHeight < margin) {
                                    page = pdfDoc.addPage();
                                    y = height - 50;
                                }
                                page.drawText(lineContent, { x, y, size, font: helveticaFont });
                                lineContent = word + ' ';
                                y -= lineHeight;
                            } else {
                                lineContent = testLine;
                            }
                        }
                        if (lineContent) {
                            page.drawText(lineContent, { x, y, size, font: helveticaFont });
                        }
                        y -= lineHeight;
                        y -= lineHeight;
                    }
                    return y;
                };

                // Draw common fields for all property types
                const drawCommonFields = (listingData) => {
                    const commonFields = [
                        `Sale Price: ${listingData.salePrice}`,
                        `Description: ${listingData.content}`,
                        `Location: ${listingData.locationData?.address || 'N/A'} - ${listingData.locationData?.postalCode || 'N/A'}`,
                        `About Project/Builder: ${listingData.projectBuilderDetails}`,
                        `Amenities: ${listingData.amenitiesAsString}`,
                        `Video URL: ${listingData.videoUrl}`,
                    ];

                    for (const field of commonFields) {
                        const [heading, ...rest] = field.split(':');
                        y = drawBoldText(`${heading}:`, 50, y, fontSize);
                        y = drawTextWithWrap(rest.join(':'), 50, y, fontSize);
                    }
                };

                // Draw type-specific fields
                const drawTypeSpecificFields = (listingData) => {
                    switch (createPDFInsert.listingType) {
                        case 'Apartments':
                            if (listingData.ratePerSqFt || listingData.selectedBedRooms || listingData.selectedBathRooms || listingData.totalFloors) {
                                if (listingData.ratePerSqFt) {
                                    y = drawBoldText(`Rate Per Sq Ft:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.ratePerSqFt}`, 50, y, fontSize);
                                }
                                if (listingData.selectedBedRooms) {
                                    y = drawBoldText(`Selected Bedrooms:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.selectedBedRooms}`, 50, y, fontSize);
                                }
                                if (listingData.selectedBathRooms) {
                                    y = drawBoldText(`Selected Bathrooms:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.selectedBathRooms}`, 50, y, fontSize);
                                }
                                if (listingData.totalFloors) {
                                    y = drawBoldText(`Total Floors:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.totalFloors}`, 50, y, fontSize);
                                }
                            }
                            break;

                        case 'CommercialProperties':
                            if (listingData.propertyOnFloor || listingData.totalFloors) {
                                if (listingData.propertyOnFloor) {
                                    y = drawBoldText(`Property On Floor:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.propertyOnFloor}`, 50, y, fontSize);
                                }
                                if (listingData.totalFloors) {
                                    y = drawBoldText(`Total Floors:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.totalFloors}`, 50, y, fontSize);
                                }
                            }
                            break;

                        case 'PentHouses':
                            if (listingData.mainDoorFacing || listingData.isCornerPenthouse) {
                                if (listingData.mainDoorFacing) {
                                    y = drawBoldText(`Main Door Facing:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.mainDoorFacing}`, 50, y, fontSize);
                                }
                                if (listingData.isCornerPenthouse) {
                                    y = drawBoldText(`Is Corner Penthouse:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.isCornerPenthouse}`, 50, y, fontSize);
                                }
                            }
                            break;

                        case 'Plots':
                            if (listingData.floorsAllowedForConstruction || listingData.plotDimensions) {
                                if (listingData.floorsAllowedForConstruction) {
                                    y = drawBoldText(`Floors Allowed For Construction:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.floorsAllowedForConstruction}`, 50, y, fontSize);
                                }
                                if (listingData.plotDimensions) {
                                    y = drawBoldText(`Plot Dimensions:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.plotDimensions}`, 50, y, fontSize);
                                }
                            }
                            break;

                        case 'Row Houses':
                            if (listingData.landUDSArea || listingData.isCornerRowhouse) {
                                if (listingData.landUDSArea) {
                                    y = drawBoldText(`Land UDS Area:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.landUDSArea}`, 50, y, fontSize);
                                }
                                if (listingData.isCornerRowhouse) {
                                    y = drawBoldText(`Is Corner Rowhouse:`, 50, y, fontSize);
                                    y = drawTextWithWrap(`${listingData.isCornerRowhouse}`, 50, y, fontSize);
                                }
                            }
                            break;

                        case 'Villaments':
                            if (listingData.isCornerVillament) {
                                y = drawBoldText(`Is Corner Villament:`, 50, y, fontSize);
                                y = drawTextWithWrap(`${listingData.isCornerVillament}`, 50, y, fontSize);
                            }
                            break;

                        case 'Villas':
                            if (listingData.plotArea) {
                                y = drawBoldText(`Plot Area:`, 50, y, fontSize);
                                y = drawTextWithWrap(`${listingData.plotArea}`, 50, y, fontSize);
                            }
                            break;

                        default:
                            console.warn('Unknown listing type:', createPDFInsert.listingType);
                    }
                };

                const getImageUrl = (image) => {
                    if (image instanceof File) {
                        const url = URL.createObjectURL(image);
                        console.log(url);
                        return url;
                    }
                    if (typeof image === 'object' && image.attachment) {
                        const url = httpCommon.defaults.baseURL + image.attachment.replace(/\\/g, '/');
                        console.log(url);
                        return url;
                    }
                    return '';
                };

                const addImagesToPdf = async (images, y) => {
                    for (const image of images) {
                        const imageUrl = getImageUrl(image);
                        try {
                            const imageBytes = await fetch(imageUrl).then(res => {
                                if (!res.ok) {
                                    throw new Error(`Failed to fetch image: ${res.statusText}`);
                                }
                                return res.arrayBuffer();
                            });

                            const imageFormat = imageUrl.split('.').pop().toLowerCase();
                            let embeddedImage;
                            if (imageFormat === 'jpg' || imageFormat === 'jpeg') {
                                embeddedImage = await pdfDoc.embedJpg(imageBytes);
                            } else if (imageFormat === 'png') {
                                embeddedImage = await pdfDoc.embedPng(imageBytes);
                            } else {
                                console.warn(`Unsupported image format: ${imageFormat}`);
                                continue;
                            }

                            const { width: imgWidth, height: imgHeight } = embeddedImage.scale(0.5);
                            let scaledWidth = imgWidth;
                            let scaledHeight = imgHeight;

                            if (scaledWidth > width - 100) {
                                const scaleFactor = (width - 100) / scaledWidth;
                                scaledWidth *= scaleFactor;
                                scaledHeight *= scaleFactor;
                            }

                            if (y - scaledHeight - 20 < 50) {
                                page = pdfDoc.addPage();
                                y = height - 50;
                            }

                            page.drawImage(embeddedImage, {
                                x: 50,
                                y: y - scaledHeight - 20,
                                width: scaledWidth,
                                height: scaledHeight,
                            });
                            y -= scaledHeight + 30;
                        } catch (error) {
                            console.error(`Error loading image (${imageUrl}): ${error.message}`);
                        }
                    }
                    return y;
                };

                // Add brochure PDFs
                const addBrochureToPdf = async (brochure) => {
                    for (const file of brochure) {
                        const formattedPath = file.attachment.replace(/\\/g, '/');
                        const brochureUrl = `${httpCommon.defaults.baseURL}${formattedPath}`;
                        try {
                            const brochureBytes = await fetch(brochureUrl).then(res => {
                                if (!res.ok) {
                                    throw new Error(`Failed to fetch brochure: ${res.statusText}`);
                                }
                                return res.arrayBuffer();
                            });
                            const brochurePdfDoc = await PDFDocument.load(brochureBytes);
                            const copiedPages = await pdfDoc.copyPages(brochurePdfDoc, brochurePdfDoc.getPageIndices());
                            copiedPages.forEach((page) => {
                                pdfDoc.addPage(page);
                            });
                        } catch (error) {
                            console.error(`Error loading brochure (${brochureUrl}): ${error.message}`);
                        }
                    }
                };

                y = drawBoldText(`Title: ${createPDFInsert.title}`, 50, y, 20, true);

                const mainImages = [
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.mainImage) ? createPDFInsert.ListingData.combinedImages.mainImage : []),
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.storedMainImage) ? createPDFInsert.ListingData.combinedImages.storedMainImage : [])
                ];

                if (mainImages.length > 0) {
                    y = await addImagesToPdf(mainImages, y);
                }

                y -= lineHeight * 2;

                // Draw initial fields
                y = drawBoldText(`Property Owner:`, 50, y, fontSize);
                y = drawTextWithWrap(`${createPDFInsert.selectedOwner}`, 50, y, fontSize);
                y = drawBoldText(`Type:`, 50, y, fontSize);
                y = drawTextWithWrap(`${createPDFInsert.listingType}${createPDFInsert.featured ? ' *' : ''}`, 50, y, fontSize);
                y = drawBoldText(`Region:`, 50, y, fontSize);
                y = drawTextWithWrap(`${createPDFInsert.selectedRegions}`, 50, y, fontSize);
                y = drawBoldText(`Category:`, 50, y, fontSize);
                y = drawTextWithWrap(`${createPDFInsert.selectedCategories}`, 50, y, fontSize);

                // Check for Listing Data
                const listingData = createPDFInsert.ListingData;
                if (listingData) {
                    drawCommonFields(listingData);
                    drawTypeSpecificFields(listingData);
                }

                // Gather images
                const images = [
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.galleryImages) ? createPDFInsert.ListingData.combinedImages.galleryImages : []),
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.masterPlanImages) ? createPDFInsert.ListingData.combinedImages.masterPlanImages : []),
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.floorAreaPlanImages) ? createPDFInsert.ListingData.combinedImages.floorAreaPlanImages : []),
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.storedGalleryImages) ? createPDFInsert.ListingData.combinedImages.storedGalleryImages : []),
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.storedMasterPlanImages) ? createPDFInsert.ListingData.combinedImages.storedMasterPlanImages : []),
                    ...(Array.isArray(createPDFInsert?.ListingData?.combinedImages?.storedFloorAreaPlanImages) ? createPDFInsert.ListingData.combinedImages.storedFloorAreaPlanImages : [])
                ];

                if (images.length > 0) {
                    y = await addImagesToPdf(images, y);
                } else {
                    console.warn('Warning: No valid images available to add to the PDF.');
                }

                const brochures = createPDFInsert.ListingData?.combinedBrochure?.storedBrochure || [];
                if (brochures.length > 0) {
                    await addBrochureToPdf(brochures);
                } else {
                    console.warn('Warning: No valid brochures available to add to the PDF.');
                }

                // Add footer for property details pages
                if (createPDFInsert.featured) {
                    const footerText = "* Featured Property";
                    page.drawText(footerText, { x: 50, y: 20, size: fontSize, font: helveticaFont });
                }

                // Add page numbering
                const pageCount = pdfDoc.getPageCount();
                for (let i = 0; i < pageCount; i++) {
                    const currentPage = pdfDoc.getPage(i);
                    currentPage.drawText(`Page ${i + 1} of ${pageCount}`, { x: width - 70, y: 20, size: fontSize, font: helveticaFont });
                }

                // Save the PDF
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `${createPDFInsert.title || 'document'}.pdf`;
                link.click();
            } catch (error) {
                console.error('Error creating PDF:', error);
            }
        };

        createPdfDocument();
    }, [createPDFInsert]);

    return null;
};

export default CreatePDF;
