import { NextRequest, NextResponse } from 'next/server';

import { DASHBOARD_PAGES } from '@/config/pages-url.config';

import { EnumTokens } from '@/services/token.service';

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request;
	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

	const isAuthPage = url.includes(DASHBOARD_PAGES.AUTH);

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
	}

	if (isAuthPage && !refreshToken) {
		return NextResponse.next();
	}

	if (!refreshToken) {
		return NextResponse.redirect(new URL(DASHBOARD_PAGES.AUTH, url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/i/:path', '/auth/:path', '/']
};
