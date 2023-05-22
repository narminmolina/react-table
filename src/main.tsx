import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from 'components/App';
import { LoginProvider } from 'contexts/LoginContext';
import 'assets/index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ globalStyles: () => ({ body: { backgroundColor: '#242424' } }) }}
			>
				<LoginProvider>
					<App />
					<ReactQueryDevtools initialIsOpen={false} />
				</LoginProvider>
			</MantineProvider>
		</QueryClientProvider>
	</StrictMode>
);
