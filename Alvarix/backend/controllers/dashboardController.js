const Transaction = require('../models/transaction')

const ApiLog = require('../models/apiLog')

const ApiKey = require('../models/apiKey')



// 📊 Dashboard Stats
exports.getDashboardStats = async (req, res) => {

  try {

    const totalTransactions = await Transaction.countDocuments()

    const totalApiLogs = await ApiLog.countDocuments()

    const totalApiKeys = await ApiKey.countDocuments()



    const highRiskCount = await Transaction.countDocuments({

      riskLevel: 'HIGH'

    })



    const mediumRiskCount = await Transaction.countDocuments({

      riskLevel: 'MEDIUM'

    })



    const lowRiskCount = await Transaction.countDocuments({

      riskLevel: 'LOW'

    })



    return res.status(200).json({

      success: true,

      stats: {

        total_transactions: totalTransactions,

        total_api_logs: totalApiLogs,

        total_api_keys: totalApiKeys,



        risk_distribution: {

          HIGH: highRiskCount,

          MEDIUM: mediumRiskCount,

          LOW: lowRiskCount

        }

      }

    })

  } catch (err) {

    console.error('DASHBOARD ERROR:', err)



    return res.status(500).json({

      error: 'Internal Server Error'

    })

  }

}



// 📋 Recent Transactions
exports.getRecentTransactions = async (req, res) => {

  try {

    const transactions = await Transaction

      .find()

      .sort({ createdAt: -1 })

      .limit(10)



    return res.status(200).json({

      success: true,

      transactions

    })

  } catch (err) {

    console.error('RECENT TRANSACTION ERROR:', err)



    return res.status(500).json({

      error: 'Internal Server Error'

    })

  }

}



// 📜 Recent API Logs
exports.getRecentApiLogs = async (req, res) => {

  try {

    const logs = await ApiLog

      .find()

      .sort({ createdAt: -1 })

      .limit(10)



    return res.status(200).json({

      success: true,

      logs

    })

  } catch (err) {

    console.error('API LOG ERROR:', err)



    return res.status(500).json({

      error: 'Internal Server Error'

    })

  }

}