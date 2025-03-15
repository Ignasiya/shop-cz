import axios from 'axios'

export type Model = string
export type Id = number
export type Range = [number, number]
export type Filter = Record<string, number | number[]>

export type Params = {
  filter?: Filter
  range?: Range
}

const API_BASE = 'https://test2.sionic.ru/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const getById = async (model: Model, id: Id) => {
  try {
    const response = await api.get(`/${model}/${id}`)
    return response.data
  } catch (error) {
    console.error('Ошибка получения данных:', error)
    throw error
  }
}

export const getList = async (model: Model, params?: Params) => {
  try {
    const queryParams: Record<string, string> = {}

    if (params?.filter) queryParams.filter = JSON.stringify(params.filter)

    if (params?.range) queryParams.range = JSON.stringify(params.range)

    const response = await api.get(`/${model}`, { params: queryParams })
    return response.data
  } catch (error) {
    console.error('Ошибка получения данных:', error)
    throw error
  }
}
