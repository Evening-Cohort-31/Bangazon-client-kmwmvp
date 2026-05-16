import { useEffect, useRef, useState } from 'react'
import { getCategories } from '../data/products'
import { Button, FormField, FormSelect } from '../design'

export default function Filter({ productCount, onSearch, locations }) {
  const refEls = {
    location: useRef(),
    category: useRef(),
    name: useRef(),
    min_price: useRef(),
    order_by: useRef(),
    direction: useRef(),
    number_sold: useRef(),
  }

  const [showFilters, setShowFilters] = useState(false)
  const [query, setQuery] = useState('')
  const [categories, setCategories] = useState([])
  const [direction, setDirection] = useState('asc')

  const clear = () => {
    for (let ref in refEls) {
      if (ref === 'direction') {
        refEls[ref].current.checked = false
        setDirection('asc')
      } else if (["min_price", "name", "category"].includes(ref)) {
        refEls[ref].current.value = ""
      } else {
        refEls[ref].current.value = 0
      }
    }
    onSearch('')
  }

  const orderByOptions = [
    { id: 'price', name: 'Price' },
    { id: 'name', name: 'Name' },
  ]

  useEffect(() => {
    getCategories('structured=true&order_by=name').then(setCategories)
  }, [])

  useEffect(() => {
    if (query) {
      onSearch(query)
    }
  }, [query])

  const buildQuery = (key, value) => {
    if (value && value !== "0") {
      return `${key}=${value}&`
    }
    return ""
  }

  const filter = () => {
    let newQuery = ""
    for (let refEl in refEls) {
      newQuery += buildQuery(refEl, refEls[refEl].current.value)
    }
    setQuery(newQuery)
  }

  return (
    <div className='level'>
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <strong>{productCount}</strong> products
          </p>
        </div>
        <div className="level-item">
          <div className="field has-addons">
            <div className="control">
              <input
                id="name"
                ref={refEls.name}
                className="input"
                type="text"
                placeholder="Find a Product"
              />
            </div>
            <div className="control">
              <Button color="primary" onClick={filter}>Search</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <div className={`dropdown is-right ${showFilters ? 'is-active' : ''}`}>
            <div className="dropdown-trigger">
              <Button
                aria-haspopup="true"
                aria-controls="dropdown-menu"
                onClick={() => setShowFilters(!showFilters)}
              >
                <span>Filter Products</span>
                <span className="icon is-small">
                  <i className="fas fa-filter"></i>
                </span>
              </Button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <div className="dropdown-item">
                  <FormSelect label="Location" name="location" inputRef={refEls.location}>
                    <option value="0">All Locations</option>
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </FormSelect>
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <FormSelect label="Category" name="category" inputRef={refEls.category}>
                    <option value="">All Categories</option>
                    {categories.map(parent => (
                      <optgroup key={parent.id} label={parent.name}>
                        {parent.children.map(child => (
                          <option key={child.id} value={child.id}>{child.name}</option>
                        ))}
                      </optgroup>
                    ))}
                  </FormSelect>
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <FormField
                    type="number"
                    label="Minimum Price"
                    placeholder="0.00"
                    name="min_price"
                    inputRef={refEls.min_price}
                  />
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <FormField
                    type="number"
                    label="Number Sold"
                    placeholder="0"
                    name="number_sold"
                    inputRef={refEls.number_sold}
                  />
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <FormSelect label="Order by" name="order_by" inputRef={refEls.order_by}>
                    <option value="0">No sorting</option>
                    {orderByOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </FormSelect>
                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          value={direction}
                          ref={refEls.direction}
                          onChange={(event) => {
                            if (event.target.checked) {
                              setDirection('desc')
                            } else {
                              setDirection('asc')
                            }
                          }}
                        />
                        desc
                      </label>
                    </div>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <div className="dropdown-item">
                  <div className="field is-grouped">
                    <p className="control">
                      <Button color="primary" onClick={filter}>Filter</Button>
                    </p>
                    <p className="control">
                      <Button color="danger" onClick={clear}>Clear</Button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
