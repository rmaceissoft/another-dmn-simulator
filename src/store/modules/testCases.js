import jsonModel from '/src/components/model.json';
import { decisionTable } from '@arvind-agarwal/dmn-eval-js';

// initial state
const state = () => ({
  all: [],
  model: jsonModel,
})

// getters
const getters = {}

// actions
const actions = {
  async getAllTestCases ({ commit }) {
    // const testCases = await api.getTestCases()
    const testCases = []
    commit('setTestCases', testCases)
  },
  
  async evaluateTestCase ({ commit, state }, testCase) {
    const invokeApi = (decision, inputValues) => {
      // TODO: get only the input values related to current decision
      // 1. Obtain an array with input names related to the given decision (check getInputNamesFromDecision)
      // const inputNames = getInputNamesFromDecision(decision)

      // 2. Iterate over prev array to get values from inputValues
      // const filteredInputValues = Object.fromEntries(
      //   inputNames.map((key) => [key, inputValues[key] ?? ''])
      // );
      console.log(decision)
      console.log(`evaluando desicion: ${decision.decision_id}`)
      console.log(`input values:`, inputValues)

      decisionTable.parseDmnXml(state.model.xmlStr)
        .then((decisions) => {
          // DMN was successfully parsed
          const context = inputValues
          try {
              // NOTE: example to evaluate all decisions
              // output = decisionTable.evaluateAllDecisions(decisions, context)
              const output = decisionTable.evaluateDecision(decision.decision_id, decisions, context)
            console.log(output)
            testCase.outputValues = {
              ...testCase.outputValues,
              ...output
            }
            return output
          } catch (err) {
            // failed to evaluate rule, maybe the context is missing some data?
            console.log(err)
          }
        })
        .catch(err => {
          // failed to parse DMN XML: either invalid XML or valid XML but invalid DMN
          console.log(err)
        })
    }

    const evaluateDecision = (decision, inputValues, isAll) => {
      if (decision.required && isAll) {
        console.log('required = true')
        decision.required.forEach( (decisionId) => { 
          console.log(`decisionId=${decisionId}`)
          inputValues = {
            ...inputValues,
            ...evaluateDecision(jsonModel.decisions.find((item) => item.decision_id === decisionId), inputValues, isAll)
          }
        })
      }
      // invoke api endpoint with proper values and return object with real output values
      return invokeApi(decision, inputValues)
    }
    
    // TODO: invoke sanitizeTestCaseValues
    // sanitizeTestCaseValues(testCase)
    if (testCase.decisionId === 'all') {
      console.log('evaluando todas las decisiones')
      console.log(evaluateDecision(jsonModel.decisions[0], testCase.inputValues, true))
    } else {
      console.log(`evaluando decision ${testCase.decisionId}`)
      const testCaseDecision = jsonModel.decisions.find((decision) => decision.decision_id === testCase.decisionId)
      console.log(evaluateDecision(testCaseDecision, testCase.inputValues, false))
    }
    console.log(testCase)
  }
}

// mutations
const mutations = {
  setTestCases (state, testCases) {
    state.all = testCases
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}