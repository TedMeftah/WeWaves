import { browser } from '$app/env'
import { providers } from 'ethers'
import { derived, readable } from 'svelte/store'

const account = readable<string>(undefined, (set) => {
	if (!browser || !window.ethereum) return
	set(window.ethereum.selectedAddress || undefined)

	const onAccountsChanged = (accounts: string[]) => set(accounts[0])
	window.ethereum.on('accountsChanged', onAccountsChanged)
	return () => window.ethereum.off('accountsChanged', onAccountsChanged)
})

const chainID = readable<string>(undefined, (set) => {
	if (!browser || !window.ethereum) return
	set(window.ethereum.chainId || undefined)

	const onChainChanged = (id: string) => set(id || undefined)
	window.ethereum.on('chainChanged', onChainChanged)
	return () => window.ethereum.off('chainChanged', onChainChanged)
})

const provider = derived(account, ($account) =>
	$account ? new providers.Web3Provider(window.ethereum) : undefined
)

const signer = derived(provider, ($provider) =>
	$provider ? $provider.getSigner() : undefined
)

export { account, provider, signer, chainID }
