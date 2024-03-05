import React from 'react';

import { GlobalLoader } from '@/components/dashboard-layout/header/profile/global-loader';
import { Profile } from '@/components/dashboard-layout/header/profile/profile';

export const Header = () => {
	return (
		<header>
			<GlobalLoader />
			<Profile />
		</header>
	);
};
