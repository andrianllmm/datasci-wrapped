import html2canvas from "html2canvas";
import JSZip from "jszip";

export async function exportSlidesAsZip(
  slideIds: string[],
  userName: string,
): Promise<void> {
  const successfulSlides: string[] = [];

  try {
    const zip = new JSZip();

    let slideNumber = 1;

    for (const slideId of slideIds) {
      const element = document.getElementById(slideId);
      if (!element) {
        console.warn(`Element with id ${slideId} not found`);
        continue;
      }

      try {
        // Capture the slide
        const canvas = await html2canvas(element, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          removeContainer: true,
          windowHeight: element.scrollHeight || element.clientHeight,
          windowWidth: element.scrollWidth || element.clientWidth,
        });

        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to create blob from canvas"));
            }
          }, "image/png");
        });

        zip.file(`slide-${slideNumber}.png`, blob);
        successfulSlides.push(slideId);
        console.log(`Exported slide: ${slideId}`);
        slideNumber++;
      } catch (slideError) {
        console.error(`Failed to capture slide ${slideId}:`, slideError);

        // Try to clean up the style if it exists
        const styleElement = document.getElementById(`export-style-${slideId}`);
        if (styleElement) {
          styleElement.remove();
        }

        // Continue with next slide instead of failing completely
        continue;
      }
    }

    console.log(
      `Successfully exported ${successfulSlides.length} slides: ${successfulSlides.join(", ")}`,
    );

    // Generate and download the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    const objectUrl = URL.createObjectURL(zipBlob);
    link.href = objectUrl;
    const safeUserName = userName.replace(/[^a-zA-Z0-9_-]/g, "-");
    link.download = `${safeUserName}-wrapped-${new Date().getFullYear()}.zip`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Error exporting slides");
  }
}
