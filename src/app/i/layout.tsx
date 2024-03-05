import React, { PropsWithChildren } from 'react';

import { DashboardLayout } from '@/components/dashboard-layout/dashboard.layout';

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
