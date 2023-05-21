import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';

import { App} from 'components/App';

import 'assets/index.css';


createRoot(document.getElementById('root') as HTMLElement).render(
	<StrictMode>
			<MantineProvider
				withGlobalStyles
				withNormalizeCSS
				theme={{ globalStyles: () => ({ body: { backgroundColor: '#242424' } }) }}
			>
					<App />
			</MantineProvider>
	</StrictMode>
);
