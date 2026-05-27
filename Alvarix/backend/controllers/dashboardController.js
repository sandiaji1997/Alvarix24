const transaction = require('../models/transaction')

const apilog = require('../models/apilog')

const apikey = require('../models/apikey')



// 📊 Dashboard Stats
exports.getDashboardStats = async (req, res) => {

  try {

    const totaltransactions = await transaction.countDocuments()

    const totalapilogs = await apilog.countDocuments()

    const totalapikeys = await apikey.countDocuments()



    const highRiskCount = await transaction.countDocuments({

      riskLevel: 'HIGH'

    })



    const mediumRiskCount = await transaction.countDocuments({

      riskLevel: 'MEDIUM'

    })



    const lowRiskCount = await transaction.countDocuments({

      riskLevel: 'LOW'

    })



    return res.status(200).json({

      success: true,

      stats: {

        total_transactions: totaltransactions,

        total_api_logs: totalapilogs,

        total_api_keys: totalapikeys,



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



// 📋 Recent transactions
exports.getRecenttransactions = async (req, res) => {

  try {

    const transactions = await transaction

      .find()

      .sort({ createdAt: -1 })

      .limit(10)



    return res.status(200).json({

      success: true,

      transactions

    })

  } catch (err) {

    console.error('RECENT transaction ERROR:', err)



    return res.status(500).json({

      error: 'Internal Server Error'

    })

  }

}



// 📜 Recent API Logs
exports.getRecentapilogs = async (req, res) => {

  try {

    const logs = await apilog

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
