import './main.scss'
import btnImg from './assets/images/icon-arrow.svg'
import { useState } from 'react'
import { DateTime } from 'luxon'

function App() {
  const initialFormValue = { year: '', month: '', day: '' }
  const [formValue, setFormValue] = useState(initialFormValue)
  const [formError, setFormError] = useState({})
  const [age, setAge] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setFormValue({ ...formValue, [name]: value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    setFormError(validateForm(formValue))
  }

  function validateForm(formValue) {
    const error = {}

    const year = Number(formValue.year)
    const month = Number(formValue.month)
    const day = Number(formValue.day)

    if (!formValue.year) {
      error.year = 'Year is Required!'
    } else if (year < 1970) {
      error.year = 'Year must be grater than 1970'
    }

    if (!formValue.month) {
      error.month = 'Month is required!'
    } else if (month < 1 || month > 12) {
      error.month = 'Month must be between 1 to 12'
    }

    if (!formValue.day) {
      error.day = 'Day is required!'
    } else if (day < 1 || day > 31) {
      error.day = 'days must be between 1 to 31'
    }

    if (Object.keys(error).length === 0) {
      const dt = DateTime.fromObject(formValue)
      if (!dt.isValid) error.day = 'Day is not valid'
      else {
        const now = DateTime.now()
        const a = now.diff(dt, ['months', 'days', 'year']).toObject()
        setAge(a)
        console.log(a)
      }
    }

    return error
  }

  return (
    <div className="container">
      <div className="age-calc">
        <form action="#" className="age-calc__form" onSubmit={handleSubmit}>
          <div className={`age-calc__input-box`}>
            <label htmlFor="input-date">Day</label>
            <input
              value={formValue.day}
              onChange={handleChange}
              type="number"
              name="day"
              id="input-date"
              placeholder="DD"
            />
            {formError.day && <p>{formError.day}</p>}
          </div>

          <div className={`age-calc__input-box`}>
            <label htmlFor="input-month">Month</label>
            <input
              value={formValue.month}
              onChange={handleChange}
              type="number"
              name="month"
              id="input-month"
              placeholder="MM"
            />
            {formError.month && <p>{formError.month}</p>}
          </div>

          <div className={`age-calc__input-box`}>
            <label htmlFor="input-year">Year</label>
            <input
              value={formValue.year}
              onChange={handleChange}
              type="number"
              name="year"
              id="input-year"
              placeholder="YYYY"
            />
            {formError.year && <p>{formError.year}</p>}
          </div>

          <button className="btn btn-submit">
            <img className="btn__icon" src={btnImg} alt="Down arrow" />
          </button>
        </form>

        <div className="age-calc__content">
          <h1 className="age-calc__text">
            <p>
              <span>{age.years ? age.years : '__'}</span> Years
            </p>
            <p>
              <span>{age.months ? age.months : '__'}</span> Month
            </p>
            <p>
              <span>{age.days ? Math.floor(age.days) : '__'}</span> Days
            </p>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default App
