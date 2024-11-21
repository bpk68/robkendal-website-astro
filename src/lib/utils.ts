export function shuffle<T>(arr: T[]): T[] {
	return arr.sort(() => Math.random() - 0.5);
}

export function generateSocialImage({
	title = "",
	cloudName = "k-tech-uk",
	imagePublicID = "k-tech-social-image_nucvkg",
	cloudinaryUrlBase = "https://res.cloudinary.com",
	version = null,
	titleFont = "p3h2baj8hz4r4pbuurvg.woff2",
	titleExtraConfig = "_bold",
	imageWidth = 1024,
	imageHeight = 560,
	textAreaWidth = 800,
	textAreaHeight = 510,
	textLeftOffset = 115,
	textBottomOffset = -50,
	textColor = "FDFAF6",
	titleFontSize = 85,
}): string {
	// configure social media image dimensions, quality, and format
	const imageConfig = [
		`w_${imageWidth}`,
		`h_${imageHeight}`,
		"c_fill",
		"f_auto",
	].join(",");

	// configure the title text
	const titleConfig = [
		`w_${textAreaWidth}`,
		`h_${textAreaHeight}`,
		"c_fit",
		`co_rgb:${textColor}`,
		"g_west",
		`x_${textLeftOffset}`,
		`y_${textBottomOffset}`,
		`l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
			title,
		)}`,
	].join(",");

	// combine all the pieces required to generate a Cloudinary URL
	const urlParts = [
		cloudinaryUrlBase,
		cloudName,
		"image",
		"upload",
		imageConfig,
		// underlayConfig,
		titleConfig,
		version,
		imagePublicID,
	];

	// remove any falsy sections of the URL (e.g. an undefined version)
	const validParts = urlParts.filter(Boolean);

	// join all the parts into a valid URL to the generated image
	return validParts.join("/");
}

export function fixTrailingSlashPath(pathname: string) {
	if (pathname[pathname.length] === "/") return pathname;

	return `${pathname}/`;
}
