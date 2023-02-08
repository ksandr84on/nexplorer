import 'bootstrap'

export async function addChainToMM ({ btn }) {
  try {
    const chainIDFromWallet = await window.ethereum.request({ method: 'eth_chainId' })
    const chainIDFromInstance = getChainIdHex()

    const coinName = document.getElementById('js-coin-name').value
    const subNetwork = document.getElementById('js-subnetwork').value
    const jsonRPC = process.env.RPC_NODE_ADDRESS
    const path = process.env.NETWORK_PATH || '/'

    const blockscoutURL = process.env.EXPLORER_ADDRESS
    if (chainIDFromWallet !== chainIDFromInstance) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: chainIDFromInstance,
          chainName: subNetwork,
          nativeCurrency: {
            name: coinName,
            symbol: coinName,
            decimals: 18
          },
          rpcUrls: [jsonRPC],
          blockExplorerUrls: [blockscoutURL]
        }]
      })
    } else {
      btn.tooltip('dispose')
      btn.tooltip({
        title: `You're already connected to ${subNetwork}`,
        trigger: 'click',
        placement: 'bottom'
      }).tooltip('show')

      setTimeout(() => {
        btn.tooltip('dispose')
      }, 3000)
    }
  } catch (error) {
    console.error(error)
  }
}

function getChainIdHex () {
  const chainIDFromDOM = document.getElementById('js-chain-id').value
  const chainIDFromInstance = parseInt(chainIDFromDOM)
  return chainIDFromInstance && `0x${chainIDFromInstance.toString(16)}`
}
