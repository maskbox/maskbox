/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		newNextLinkBehavior: true,
		images: {
			allowFutureImage: true
		}
	}
};
