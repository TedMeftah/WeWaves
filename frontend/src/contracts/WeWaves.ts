import { ethers } from 'ethers'
import { abi as contractABI } from '@wewaves/contract/artifacts/contracts/WeWaves.sol/WeWaves.json'
import { writable, derived } from 'svelte/store'
import { signer } from './Provider'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS as string

const contract = derived(signer, ($signer) => {
	if (!$signer) return

	const contract = new ethers.Contract(contractAddress, contractABI, $signer)

	async function update() {
		waves.set(await contract.getWaves())
		total.set(await contract.getTotal())
	}

	return {
		async wave(message: string) {
			const waveTxn = await contract.wave(message)
			await waveTxn.wait()
			await update()
		}
	}
})

type Wave = {
	from: string
	message: string
}
const waves = writable<Wave[]>([])
const total = writable(0)

export { contract, waves, total }
