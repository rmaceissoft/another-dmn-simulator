import jsonModel from '/src/components/model.json';


// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

const FAKE_DECISION_OUTPUTS = {
  "dish-decision": {
    "desiredDish": "test",
  },
  "season": {
    "season": "winter"
  },
  "guestCount": {
    "guestCount": 4
  },
  "Decision_098q2pi": {
    "Decision_098q2pi": "NombreVarialbeleExpresion"
  }
}

// actions
const actions = {
  async getAllTestCases ({ commit }) {
    // const testCases = await api.getTestCases()
    const testCases = []
    commit('setTestCases', testCases)
  },
  
  async evaluateTestCase ({ commit }, testCase) {    
    const invokeApi = (decision, inputValues) => {
      // TODO: get only the input values related to current decision
      // 1. Obtain an array with input names related to the given decision (check getInputNamesFromDecision)
      // const inputNames = getInputNamesFromDecision(decision)

      // 2. Iterate over prev array to get values from inputValues
      // const filteredInputValues = Object.fromEntries(
      //   inputNames.map((key) => [key, inputValues[key] ?? ''])
      // );
    
      console.log(`evaluando desicion: ${decision.decision_id}`)
      console.log(`input values:`, inputValues)
      return FAKE_DECISION_OUTPUTS[decision.decision_id] 
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
      // TODO:
      /**
      1. Validar si en mainNode tiene required
        1.a Si tiene required, recorrer el arreglo y evaluateTestCase() cada decision hija
        1.b Recibir los resultados de las hijas en un objeto evaluacion {input: value,...}
      2. Si no tiene required
        2.a Invoke evaluateDecision() 
       */
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