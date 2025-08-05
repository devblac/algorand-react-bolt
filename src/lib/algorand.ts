import algosdk from 'algosdk'

// Algorand configuration for TestNet
const ALGORAND_CONFIG = {
  server: 'https://testnet-api.algonode.cloud',
  port: '',
  token: '',
  network: 'TestNet'
}

export const algodClient = new algosdk.Algodv2(
  ALGORAND_CONFIG.token,
  ALGORAND_CONFIG.server,
  ALGORAND_CONFIG.port
)

export class AlgorandService {
  static async getAccountInfo(address: string) {
    try {
      const accountInfo = await algodClient.accountInformation(address).do()
      return {
        balance: accountInfo.amount / 1_000_000, // Convert microAlgos to Algos
        assets: accountInfo.assets || [],
        address
      }
    } catch (error) {
      console.error('Error fetching account info:', error)
      throw new Error('Failed to fetch account information')
    }
  }

  static async createPaymentTransaction(
    from: string,
    to: string,
    amount: number,
    note?: string
  ) {
    try {
      const suggestedParams = await algodClient.getTransactionParams().do()
      
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from,
        to,
        amount: amount * 1_000_000, // Convert Algos to microAlgos
        note: note ? new TextEncoder().encode(note) : undefined,
        suggestedParams
      })

      return txn
    } catch (error) {
      console.error('Error creating transaction:', error)
      throw new Error('Failed to create payment transaction')
    }
  }

  static async submitTransaction(signedTxn: Uint8Array) {
    try {
      const { txId } = await algodClient.sendRawTransaction(signedTxn).do()
      await algosdk.waitForConfirmation(algodClient, txId, 4)
      return txId
    } catch (error) {
      console.error('Error submitting transaction:', error)
      throw new Error('Failed to submit transaction')
    }
  }
}