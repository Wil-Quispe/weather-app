import { ChangeEvent, useState } from 'react'

const uri1 = `https://www.metaweather.com/api/location/search/?query=`

const Home = () => {
  const ImgContainer = () => {
    const TopImg = () => {
      return (
        <div className="">
          <h2>Sunday</h2>
          <div>
            <p>Frebary 7th</p>
            <p>icon Berlin</p>
          </div>
        </div>
      )
    }
    const BottomImg = () => {
      return (
        <div>
          <span>Icon</span>
          <p>Frebary 7th</p>
          <p>icon Berlin</p>
        </div>
      )
    }

    return (
      <div className="w-8/12 relative">
        <div className="bg-gradient-to-b from-green-100 to-blue-500 absolute w-full h-full rounded-3xl opacity-90">
          <div className="flex ml-4 h-full flex-col justify-around">
            <TopImg />
            <BottomImg />
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/672451/pexels-photo-672451.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          className="h-full object-cover rounded-3xl"
        />
      </div>
    )
  }

  const DataContainer = () => {
    // if (!weather.consolidated_weather) return <h1>no data</h1>
    return (
      <div>
        <div className="mb-1 flex flex-row justify-between w-full">
          <p className="font-bold text-lg">PREDICTABILITY</p>
          <p>{weather.consolidated_weather[0].predictability}</p>
        </div>
        <div className="mb-1 flex flex-row justify-between w-full">
          <p className="font-bold text-lg">HUMIDITY</p>
          <p>{weather.consolidated_weather[0].humidity}</p>
        </div>
        <div className="mb-1 flex flex-row justify-between w-full">
          <p className="font-bold text-lg">WIND</p>
          <p>{weather.consolidated_weather[0].wind_speed}</p>
        </div>
        <div className="mb-1 flex flex-row justify-between w-full">
          <p className="font-bold text-lg">AIR PRESSURE</p>
          <p>{weather.consolidated_weather[0].air_pressure}</p>
        </div>
        <div className="mb-1 flex flex-row justify-between w-full">
          <p className="font-bold text-lg">MAX TEMP</p>
          <p>{weather.consolidated_weather[0].max_temp}</p>
        </div>
        <div className="mb-1 flex flex-row justify-between w-full">
          <p className="font-bold text-lg">MIN TEMP</p>
          <p>{weather.consolidated_weather[0].min_temp}</p>
        </div>
      </div>
    )
  }

  const IncomingContainer = () => {
    const Card = () => {
      return (
        <div>
          <span>icon</span>
          <p>Mon</p>
          <p className="font-bold">-7.</p>
        </div>
      )
    }
    return (
      <div className="bg-gray-800 w-full flex justify-between rounded-lg py-2 px-3 mt-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    )
  }

  const CardContainer = () => {
    return (
      <div className="flex flex-row rounded-3xl bg-gray-900 w-10/12 h-96">
        <ImgContainer />
        <div className="w-full mt-3 mx-3">
          <DataContainer />
          <IncomingContainer />
        </div>
      </div>
    )
  }

  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState({} as Weather)
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearch(target.value)
  }
  const handleClick = async () => {
    const res = await fetch(`${uri1}${search}`, { mode: 'no-cors' })
    const { woeid } = await res.json()

    const resAll = await fetch(
      `https://www.metaweather.com/api/location/${woeid}`,
      { mode: 'no-cors' },
    )
    const data = await resAll.json()
    setWeather(data)
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="flex flex-col w-5/12 mb-10 mt-5 bg-gray-800 px-20 py-10 rounded-3xl shadow-2xl">
        <input
          className="py-1 rounded-2xl mb-3 pl-5"
          placeholder="write a city"
          onChange={handleChange}
        />
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-blue-300 to-blue-700  py-1 rounded-2xl"
        >
          Search
        </button>
      </div>
      {weather.consolidated_weather && (
        <div>
          <div className="flex flex-row justify-center">
            <p className="text-3xl mr-2">Weather</p>
            <p className="text-3xl font-bold">Forecast</p>
          </div>
          <div className="flex justify-center mt-5">
            <CardContainer />
          </div>
        </div>
      )}
    </div>
  )
}
export default Home

export interface Weather {
  consolidated_weather: ConsolidatedWeather[]
  time: string
  sun_rise: string
  sun_set: string
  timezone_name: string
  parent: Parent
  sources: Source[]
  title: string
  location_type: string
  woeid: number
  latt_long: string
  timezone: string
}

export interface ConsolidatedWeather {
  id: number
  weather_state_name: string
  weather_state_abbr: string
  wind_direction_compass: string
  created: string
  applicable_date: string
  min_temp: number
  max_temp: number
  the_temp: number
  wind_speed: number
  wind_direction: number
  air_pressure: number
  humidity: number
  visibility: number
  predictability: number
}

export interface Parent {
  title: string
  location_type: string
  woeid: number
  latt_long: string
}

export interface Source {
  title: string
  slug: string
  url: string
  crawl_rate: number
}
