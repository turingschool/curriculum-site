# Iteration 3 - Data Access & Relationships: Statewide Testing

![Iteration 3](http://imgur.com/Rhpl1is.png)

### `StatewideTestRepository`

The `StatewideTestRepository` is responsible for holding and searching our `StatewideTest`
instances. It offers the following methods:

* `#find_by_name` - returns either `nil` or an instance of `StatewideTest` having done a *case insensitive* search

The `StatewideTest` instances are built using these data files:

* `3rd grade students scoring proficient or above on the CSAP_TCAP.csv`
* `8th grade students scoring proficient or above on the CSAP_TCAP.csv`
* `Average proficiency on the CSAP_TCAP by race_ethnicity_ Math.csv`
* `Average proficiency on the CSAP_TCAP by race_ethnicity_ Reading.csv`
* `Average proficiency on the CSAP_TCAP by race_ethnicity_ Writing.csv`

The repository is initialized and used like this:

```ruby
str = StatewideTestRepository.new
str.load_data({
  :statewide_testing => {
    :third_grade => "./data/3rd grade students scoring proficient or above on the CSAP_TCAP.csv",
    :eighth_grade => "./data/8th grade students scoring proficient or above on the CSAP_TCAP.csv",
    :math => "./data/Average proficiency on the CSAP_TCAP by race_ethnicity_ Math.csv",
    :reading => "./data/Average proficiency on the CSAP_TCAP by race_ethnicity_ Reading.csv",
    :writing => "./data/Average proficiency on the CSAP_TCAP by race_ethnicity_ Writing.csv"
  }
})
str = str.find_by_name("ACADEMY 20")
# => <StatewideTest>
```

## `StatewideTest`

An instance of this class contains *all* the data from the files above for a single district and offers the following methods:

### `#proficient_by_grade(grade)`

This method takes one parameter:

* `grade` as an integer from the following set: `[3, 8]`

A call to this method with an unknown grade should raise an `UnknownDataError`.

The method returns a hash grouped by year referencing percentages by subject all as three digit floats.

*Example*:

```ruby
statewide_test.proficient_by_grade(3)
=> { 2008 => {:math => 0.857, :reading => 0.866, :writing => 0.671},
     2009 => {:math => 0.824, :reading => 0.862, :writing => 0.706},
     2010 => {:math => 0.849, :reading => 0.864, :writing => 0.662},
     2011 => {:math => 0.819, :reading => 0.867, :writing => 0.678},
     2012 => {:math => 0.830, :reading => 0.870, :writing => 0.655},
     2013 => {:math => 0.855, :reading => 0.859, :writing => 0.668},
     2014 => {:math => 0.834, :reading => 0.831, :writing => 0.639}
   }
```

### `#proficient_by_race_or_ethnicity(race)`

This method takes one parameter:

* `race` as a symbol from the following set: `[:asian, :black, :pacific_islander, :hispanic, :native_american, :two_or_more, :white]`

A call to this method with an unknown race should raise an `UnknownRaceError`.

The method returns a hash grouped by race referencing percentages by subject all
as truncated three digit floats.

*Example*:

```ruby
statewide_test.proficient_by_race_or_ethnicity(:asian)
=> { 2011 => {math: 0.816, reading: 0.897, writing: 0.826},
     2012 => {math: 0.818, reading: 0.893, writing: 0.808},
     2013 => {math: 0.805, reading: 0.901, writing: 0.810},
     2014 => {math: 0.800, reading: 0.855, writing: 0.789},
   }
```

### `#proficient_for_subject_by_grade_in_year(subject, grade, year)`

This method takes three parameters:

* `subject` as a symbol from the following set: `[:math, :reading, :writing]`
* `grade` as an integer from the following set: `[3, 8]`
* `year` as an integer for any year reported in the data

A call to this method with any invalid parameter (like subject of `:science`) should raise an `UnknownDataError`.

The method returns a truncated three-digit floating point number representing a percentage.

*Example*:

```ruby
statewide_test.proficient_for_subject_by_grade_in_year(:math, 3, 2008) # => 0.857
```

### `#proficient_for_subject_by_race_in_year(subject, race, year)`

This method take three parameters:

* `subject` as a symbol from the following set: `[:math, :reading, :writing]`
* `race` as a symbol from the following set: `[:asian, :black, :pacific_islander, :hispanic, :native_american, :two_or_more, :white]`
* `year` as an integer for any year reported in the data

A call to this method with any invalid parameter (like subject of `:history`) should raise an `UnknownDataError`.

The method returns a truncated three-digit floating point number representing a percentage.

*Example*:

```ruby
statewide_test.proficient_for_subject_by_race_in_year(:math, :asian, 2012) # => 0.818
```

## Relationship: `District` to `StatewideTest`

When the `DistrictRepository` is built from the data folder, an instance of `District` should now be connected to an instance of `StatewideTest`:

```ruby
dr = DistrictRepository.new
dr.load_data({
  :enrollment => {
    :kindergarten => "./data/Kindergartners in full-day program.csv",
    :high_school_graduation => "./data/High school graduation rates.csv",
  },
  :statewide_testing => {
    :third_grade => "./data/3rd grade students scoring proficient or above on the CSAP_TCAP.csv",
    :eighth_grade => "./data/8th grade students scoring proficient or above on the CSAP_TCAP.csv",
    :math => "./data/Average proficiency on the CSAP_TCAP by race_ethnicity_ Math.csv",
    :reading => "./data/Average proficiency on the CSAP_TCAP by race_ethnicity_ Reading.csv",
    :writing => "./data/Average proficiency on the CSAP_TCAP by race_ethnicity_ Writing.csv"
  }
})
district = dr.find_by_name("ACADEMY 20")
statewide_test = district.statewide_test
```
