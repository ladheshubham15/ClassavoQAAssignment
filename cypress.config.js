const { defineConfig } = require("cypress")
const fs = require("fs")

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envName = config.env.configFile || 'qa'
      const envConfigPath = `./config/${envName}.json`
      if (fs.existsSync(envConfigPath)) {
        const envData = require(envConfigPath)
        config.env = { ...config.env, ...envData }
        if (envData.baseUrl) {
          config.baseUrl = envData.baseUrl
        }
      }
      else {
        throw new Error(`Missing Config File: ${envConfigPath}`)
      }
      return config
    },

  },
})
