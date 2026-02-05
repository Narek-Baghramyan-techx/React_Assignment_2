const FilterBar = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-bar">
      <button
        className={`btn ${currentFilter === 'all' ? 'active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All
      </button>
      <button
        className={`btn ${currentFilter === 'reminder' ? 'active' : ''}`}
        onClick={() => onFilterChange('reminder')}
      >
        Reminder
      </button>
      <button
        className={`btn ${currentFilter === 'not-important' ? 'active' : ''}`}
        onClick={() => onFilterChange('not-important')}
      >
        Not Important
      </button>
    </div>
  )
}

export default FilterBar
