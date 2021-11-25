/// <reference types="@sveltejs/kit" />

declare module '*&img'
declare module 'virtual:windi-devtools'

import type { providers } from 'ethers'
import type { MetaMaskInpageProvider } from '@metamask/providers'

declare global {
	interface Window {
		ethereum: ?(providers.ExternalProvider & MetaMaskInpageProvider)
	}
}
