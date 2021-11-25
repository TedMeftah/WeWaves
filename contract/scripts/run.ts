import { ethers } from 'hardhat'

async function main() {
	const factory = await ethers.getContractFactory('WeWaves')
	const contract = await factory.deploy({
		value: ethers.utils.parseEther('0.1')
	})
	await contract.deployed()
	console.log('Contract Address: ', contract.address)

	let balance = await ethers.provider.getBalance(contract.address)
	console.log('Contract Balance: ', ethers.utils.formatEther(balance))

	let waveTxn = await contract.wave('This is wave #1')
	await waveTxn.wait()

	// waveTxn = await contract.wave('This is wave #2')
	// await waveTxn.wait()

	balance = await ethers.provider.getBalance(contract.address)
	console.log('Contract Balance: ', ethers.utils.formatEther(balance))

	const waves = await contract.getWaves()
	console.log(waves)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
