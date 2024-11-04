---
layout: page
title: Grouping and Aggregating
module: 4
---

## Learning Goals

- Understand what an aggregate function does
- Understand what the group SQL statement does
- Understand how the group statement relates to aggregate functions
- Write aggregate/group queries in SQL
- Write aggregate/group queries in ActiveRecord
- Write aggregate/group/joins queries in ActiveRecord

## Vocabulary

- SQL Group
- SQL Aggregate Function
- ActiveRecord Calculation

## Recording

[This recording](https://youtu.be/shUhwkiT2Jg) will cover the conceptual parts of the lesson, plus some bloopers at the beginning 😁

## Aggregate Functions

PostgresSQL comes with some handy built-in aggregate functions. From the [Postgresql Docs](https://www.postgresql.org/docs/14/functions-aggregate.html): `Aggregate functions compute a single result from a set of input values`. Basically, aggregate functions will do some math for us.

Take a minute to look through the [docs](https://www.postgresql.org/docs/14/functions-aggregate.html) and see what the DB can do for you.

While we are talking about functions built in to Postgresql, it is important to note that nearly all relational database systems include some form of aggregating, for example [MySQL](https://dev.mysql.com/doc/refman/8.0/en/group-by-modifiers.html).

### SQL Aggregates

We'll be working with [Set List](https://github.com/turingschool-examples/set-list-api/tree/many-to-many-complete) on the `many-to-many-complete` branch.  Let's run `rails dbconsole` in SetList to open up a connection to our Postgres Database. Let's find the average length of all songs:

```sql
select avg(length) from songs;
```

As with all our SQl queries, this is returning a new table. It has one row and one column, the average length of the songs.

We could also get a count of all our songs:

```sql
select count(*) from songs;
```

get the sum of all play_counts:

```sql
select sum(play_count) from songs;
```

and find the longest length:

```sql
select max(length) from songs;
```

### ActiveRecord Calculations

ActiveRecord gives us corresponding "calculations" for those aggregate functions. Take a minute to look through the [ActiveRecord Calculations Docs](https://api.rubyonrails.org/classes/ActiveRecord/Calculations.html) to see what calculations are available.

Let's open up Rails console with `$ rails console` and look at the ActiveRecord syntax for the above examples:

```ruby
Song.average(:length)
#=> 0.14955e4

Song.count
#=> 4

Song.sum(:play_count)
#=> 8172627

Song.maximum(:length)
#=> 4378
```

Unlike some of the ActiveRecord methods we've seen so far, the order that you put the calculations does matter. For instance, if you only want to count songs with at least 10 plays:

```ruby
Song.count.where("play_count > 10")
```

You will get this error:

```bash
NoMethodError: undefined method `where' for 4:Integer
```

Once ActiveRecord sees a calculation method, it performs the calculation and returns it. In this case, ActiveRecord does `Song.count`, returning an integer. It then throws an error when we try to call `.where` on that integer.

This is the same behavior we have seen with `.pluck`. In fact, if you look at the Calculation Docs, you'll see that `pluck` is a calculation.

## Grouping

A sql `group by` statement will take the rows that you've selected using `select`, `from`, and `where` and group them together based on a common attribute. It will then condense these rows together, usually through a calculation. Let's look at an example. Starting with this abridged form of our songs table which uses only the first 3 artists for simplicity:

**Songs Table**

| id | title | length | play_count | artist_id |
| --- | --- | --- | --- | --- |
| 1 | Raspberry Beret | 345 | 34 | 1 |
| 2 | Purple Rain | 524 | 19 | 1 |
| 3 | Legend Has It | 2301 | 2300000 | 2 |
| 4 | 26 | 940 | 150000 | 3 |
| 5 | Vagabond | 240 | 120000 | 3 |


In our pqsl session, run:

```sql
select artist_id from songs group by artist_id;
```

This will return this table:

| artist_id |
|---|
| 1 |
| 2 |
| 3 |



This is not very interesting information, but we can use this example to understand what the `group by` clause is doing. First, SQl is going to perform the `select`/`from`, which will give us this table:

| artist_id |
|---|
| 1 |
| 1 |
| 2 |
| 3 |
| 3 |


Then, `group by` will group these rows by the `artist_id`:

**group with artist_id = 1**

| artist_id |
|---|
| 1 |
| 1 |

**group with artist_id = 2**

| artist_id |
|---|
| 2 |

**group with artist_id = 3**

| artist_id |
|---|
| 3 |
| 3 |


Then, for each of these groups, sql will condense the rows.

**group with artist_id = 1**

| artist_id |
|---|
| 1 |

**group with artist_id = 2**

| artist_id |
|---|
| 2 |

**group with artist_id = 3**

| artist_id |
|---|
| 3 |

.. and so on.

And finally put all these groups back together:

**result table**

| artist_id |
|---|
| 1 |
| 2 |
| 3 |


This query is functionally the same as `select distinct artist_id from songs;`.

Let's now look at an example that doesn't work. Instead of selecting the artist_id, we'll try to select the song title:

```sql
select title from songs group by artist_id;
```

This query will give us this error:

```bash
ERROR:  column "songs.title" must appear in the GROUP BY clause or be used in an aggregate function
```

Let's break this query down in the same way to see why this isn't working:

First, we do our `select`/`from`:

| title  |
|--------|
| Raspberry Beret |
| Purple Rain |
| Legend Has  It|
| 26 |
| Vagabond |


Next, sql is going to group the rows, but since the `artist_id` is not part of of this table, we can't group on it, and so we get our error. **We can only group on attributes that are part of the select statement**.

Let's instead try to include the `artist_id` in the select statement:

```sql
select title, artist_id from songs group by artist_id;
```

And we'll get the same error. Let's break this one down. First, our `select`/`from`:

| title  | artist_id |
| --- | --- | 
| Raspberry Beret | 1 |
| Purple Rain | 1 |
| Legend Has It | 2 |
| 26 | 3 |
| Vagabond | 3 |


Next, sql tries to group the rows. We have the `artist_id` so we can do this:

**groups with artist_id = 1**

| title | artist_id |
| --- | --- |
| Raspberry Beret  | 1 |
| Heaven | 1 |

**groups with artist_id = 2**

| title | artist_id |
| --- | --- |
| Legend Has It | 2 |

**groups with artist_id = 3**

| title | artist_id |
| --- | --- |
| 26 | 3 |
| Vagabond | 3 |


Then, we try to condense the rows, but how do we condense them? If we look at the first group, there are two different titles, and sql doesn't know what to do with them. The information is conflicting. In most cases, we are going to use aggregate functions to condense rows.

## Grouping and Aggregating

Whenever we have a `group by` statement, we are going to need an aggregate function in our select statement to tell sql how we want to condense the rows. For example, we can get an average length of songs for each artist id:

```sql
select artist_id, avg(length) from songs group by artist_id;
```

For our abridged songs table (different from your seeds file), this will return:

| artist_id  | avg |
| 1 | 434.5 |
| 2 | 2301 | 
| 3 | 590 | 


Let's break this query down. First, we do our `select` statement, which includes the `artist_id` and the `length` from songs (we are ignoring the `avg` for the moment):

| artist_id | length |
| --- | --- |
| 1 | 345 | 
| 1 | 524 | 
| 2 | 2301 | 
| 3 | 940 | 
| 3 | 240 | 


Then, sql will group on the `artist_id`

**artist_id = 1**

| artist_id | length |
| 1 | 345 | 
| 1 | 524 | 

**artist_id = 2**

| artist_id | length |
| 2 | 2301 | 

**artist_id = 3**

| artist_id | length |
| 3 | 940 | 
| 3 | 240 | 

And so on...

Now sql will try to condense the rows. Like the last example, there is conflicting information (the lengths are different), but this time we have used the `avg` aggregate function to tell sql how we want to condense that information into a single value:


**artist_id = 1**

| artist_id | avg |
| 1 | 434.5 |

**artist_id = 2**

| artist_id | avg |
| 2 | 2301 | 

**artist_id = 3**

| artist_id | avg |
| 3 | 590 |

Finally, sql will put the groups back together:

**result table**

| artist_id  | avg |
| 1 | 434.5 |
| 2 | 2301 | 
| 3 | 590 | 

What if we wanted to count the number of songs for each artist?

```sql
select artist_id, count(*) from songs group by artist_id;
```

Let's follow our process again. First, the `select` statement. In this case, our `select` includes a `*`, which means everything:

| artist_id | id | title  | length  | play_count  | artist_id |
|---|---|---|---|---|
| id | title | length | play_count | artist_id |
| --- | --- | --- | --- | --- |
| 1 | 1 | Raspberry Beret | 345 | 34 | 1 |
| 1 | 2 | Purple Rain | 524 | 19 | 1 |
| 2 | 3 | Legend Has It | 2301 | 2300000 | 2 |
| 3 | 4 | 26 | 940 | 150000 | 3 |
| 3 | 5 | Vagabond | 240 | 120000 | 3 |

Notice how we selected the `artist_id` twice. Then, we group on the `artist_id`:

**artist_id = 1**

| artist_id | id | title  | length  | play_count  | artist_id |
| 1 | 1 | Raspberry Beret | 345 | 34 | 1 |
| 1 | 2 | Purple Rain | 524 | 19 | 1 |

**artist_id = 2**

| artist_id | id | title  | length  | play_count  | artist_id |
| 2 | 3 | Legend Has It | 2301 | 2300000 | 2 |


**artist_id = 3**

| artist_id | id | title  | length  | play_count  | artist_id |
| 3 | 4 | 26 | 940 | 150000 | 3 |
| 3 | 5 | Vagabond | 240 | 120000 | 3 |

In this case, there is a lot of conflicting information in our groups, but count knows how to condense them. Just count the rows:

**artist_id = 1**

| artist_id | count |
| 1 | 2 |

**artist_id = 2**

| artist_id | count |
| 2 | 1 |

**artist_id = 3**

| artist_id | count |
| 3 | 2 |

Finally, put the groups back together:

| artist_id | count |
| 1 | 2 |
| 2 | 1 |
| 3 | 2 |

If we don't want our column to be labeled `count`, we can use an **alias**:

```sql
select artist_id, count(*) as "count of songs" from songs group by artist_id;
```

## Grouping and Aggregating in ActiveRecord

Once you have a mental model for how you want to interact with your tables, you can translate the sql into the corresponding AR syntax. For example, getting a count of songs for each artist:

```ruby
Song.group(:artist_id).count
#=> {1=>2, 2=>1, 3=>2}
```

This returns a hash where the keys are the `artist_id` and the values are the counts of songs.

If we wanted to get the average length of songs for each artist:

```ruby
Song.group(:artist_id).average(:length)
#=> {3=>0.59e3, 2=>0.2301e4, 1=>0.4345e3}
```

As we mentioned before, as soon as ActiveRecord sees a calculation method, it returns the calculation immediately, so if you do something like:

```ruby
Song.average(:length).group(:artist_id)
```

You will get:

```bash
NoMethodError: undefined method `group' for 0.33175e3:BigDecimal
```

## Joining, Grouping, and Aggregating

If you use `group` with a calculation method, it will always return a hash with the grouped data and the calculation, but what if we want more than just the raw data? For instance, what if we wanted Artist objects sorted by their average length of song?

Any time we need information from two or more tables, we are going to need to **join** those tables. In this case, the Artist info is stored in the `artists` table and the Song lengths are stored in the `songs` table:

```ruby
Artist.joins(:songs)
```

That joined table will look like:

| id | name  | id | title  | length  | play_count  | artist_id |
| 1 | Prince | 1 | Raspberry Beret | 345 | 34 | 1 |
| 1 | Prince | 2 | Purple Rain | 524 | 19 | 1 |
| 2 | Run The Jewels | 3 | Legend Has It | 2301 | 2300000 | 2 |
| 3 | Caamp | 4 | 26 | 940 | 150000 | 3 |
| 3 | Caamp | 5 | Vagabond | 240 | 120000 | 3 |

In order to average the song lengths for each artist, we will need to group by the artist's id:

```ruby
Artist.joins(:songs).group(:id).average(:length)
```

Notice how there are two columns called `id` in this joined table. ActiveRecord will pick the first one, which in this case is the Artist id.

If you run this query, you'll notice that it's still returning us a hash. If we want to get our Artist objects, we need to include a `select` statement with the aggregate `avg` rather than using the ActiveRecord `average` method. This is an example of why it's important to know SQL when writing ActiveRecord queries:

```ruby
Artist.select("artists.*, avg(length)").joins(:songs).group(:id)
```

Let's visualize what this is doing. First, we take the joined table, select the all the Artist columns (id and name) and the length column from Songs:

| id | name | length |
| 1 | Prince | 345 |
| 1 | Prince | 524 | 
| 2 | Run The Jewels | 2301 |
| 3 | Caamp | 940 | 
| 3 | Caamp | 240 |

Group them by the id:

**id = 1**

| id | name | length |
| 1 | Prince | 345 |
| 1 | Prince | 524 | 

**id = 2**

| id | name | length |
| 2 | Run The Jewels | 2301 |

**id = 3**

| id | name | length |
| 3 | Caamp | 940 | 
| 3 | Caamp | 240 |

And condense the rows by averaging the length:

**id = 1**

| id | name | average_song_length |
| 1 | Prince | 434.5 |

**id = 2**

| id | name | average_song_length |
| 2 | Run The Jewels  | 2301 |

**id = 3**

| id | name | average_song_length |
| 3 | Caamp | 590 |

And finally, put all the groups back together:

| id | name | average_song_length |
| 1 | Prince | 434.5 |
| 2 | Run The Jewels  | 2301 |
| 3 | Caamp | 590 |


If you run this query in the Rails console, You'll get this return value:

```ruby
=> 
[#<Artist:0x000000010685e790
  id: 1,
  name: "Prince",
  created_at: Tue, 29 Oct 2024 18:40:29.667238000 UTC +00:00,
  updated_at: Tue, 29 Oct 2024 18:40:29.667238000 UTC +00:00>,
 #<Artist:0x0000000103850b48
  id: 2,
  name: "Run The Jewels",
  created_at: Tue, 29 Oct 2024 18:40:29.670766000 UTC +00:00,
  updated_at: Tue, 29 Oct 2024 18:40:29.670766000 UTC +00:00>,
 #<Artist:0x0000000103850648
  id: 3,
  name: "Caamp",
  created_at: Tue, 29 Oct 2024 18:40:29.672881000 UTC +00:00,
  updated_at: Tue, 29 Oct 2024 18:40:29.672881000 UTC +00:00>]
```

We can see our Artists in this ActiveRecord::Relation, but where is our average song length? It's there, we just can't see it:

```ruby
artists = Artist.joins(:songs).select("artists.*, avg(length)").group(:id)
artists.first.avg
#=> 0.4345e3
```

ActiveRecord is creating a new attribute for our returned Artists objects called `avg`. This is a default name. We can change it with an alias:

```ruby
artists = Artist.joins(:songs).select("artists.*, avg(length) as avg_length").group(:id)
artists.first.avg_length
#=> 0.4345e3
```

It's important to note that this is not a new attribute for the Artist records in our database. This is a **temporary attribute** that is created for the objects returned from our query.

Now that we have our average song length for each Artist, we can sort this list:

```ruby
artists = Artist.joins(:songs).select("artists.*, avg(length) as avg_length").group(:id).order("avg_length")
```

One ActiveRecord quirk you may run into is if you try to use a symbol rather than a string:

```ruby
artists = Artist.joins(:songs).select("artists.*, avg(length) as avg_length").group(:id).order(:avg_length)
```

Will produce:

```bash
ActiveRecord::StatementInvalid: PG::UndefinedColumn: ERROR:  column artists.avg_length does not exist
```

Whenever you use symbol notation, ActiveRecord assumes that you are referring to a colum of the table that corresponds to the Model you started the query with (in this case `Artist` relates to the `artists` table). We need to use string notation to tell ActiveRecord to insert the string `"avg_length"` as-is into our group statement, rather than look for an attribute on our model.

You may also think to group on the `artist_id`:

```ruby
Artist.joins(:songs).select("artists.*, avg(length) as avg_length").group(:artist_id).order("avg_length")
```

This will produce:

```bash
ActiveRecord::StatementInvalid: PG::GroupingError: ERROR:  column "artists.id" must appear in the GROUP BY clause or be used in an aggregate function
```

Remember, we can only group on columns that are part of our `select` statement. Since we select `artists.id`, `artists.name`, and `songs.length`, we can't group on `artist_id` even though the `artist_id` is the same as `artists.id`.

## Practice Problems

Test your understanding by writing queries for the following in ActiveRecord:

1. What is the length of the longest song?
2. What is the length of each artist's longest song?
3. What is the name of the artist with the longest song?
4. What is the average length of each artists' songs?
5. What is the name of the artist with longest average length of song?
6. What are the names of the three artists with the least amount of total plays for all of their songs?

**Extra Spicy Problem**

1. Write a query to return each artist's name and a comma separated list of all their songs, for example "Talking Heads" would have "This must be the Place, Heaven"

## Checks for Understanding

- What are aggregate functions? Where do they appear in SQL statements?
- What do calculation methods in AR return?
- What does the `group by` statement do in sql?
- Why do we need to include an aggregate function when using `group by`?
- When do we need to join?

<section class="dropdown">

### Practice Problem Solutions

Run these answers in ActiveRecord in the console to see the SQL that they produce.

1. What is the length of the longest song?
Query: `Song.maximum(:length)`
=> 2301

2. What is the length of each artist's longest song?
Query: `Artist.joins(:songs).select("artists.*, max(songs.length)").group(:id)`
Use `.first.max` to see that Prince's longest length is 524

3. What is the name of the artist with the longest song?
Query: `Artist.joins(:songs).select("artists.*, max(songs.length)").group(:id).order("max desc").limit(1).first.name`
=> "Run The Jewels"

4. What is the average length of each artists' songs?
Query: `Artist.joins(:songs).select("artists.*, avg(songs.length) as average_length").group(:id)`
Use `.first.average_length` to see that Prince's average length is 434.5 or 0.4345e3 

5. What is the name of the artist with longest average length of song?
Query: `Artist.joins(:songs).select("artists.*, avg(songs.length) as average_length").group(:id).order("average_length desc").limit(1).first.name`
=> "Run The Jewels"

6. What are the names of the three artists with the least amount of total plays for all of their songs?
Query: `Artist.joins(:songs).select("artists.*, sum(play_count) as total_plays").group(:id).order("total_plays").limit(3)`
The three artists returned are Prince, Jerry Garcia Band and Caamp

Spicy
1. Write a query to return each artist's name and a comma separated list of all their songs, for example "Talking Heads" would have "This must be the Place, Heaven"
Query: `Artist.joins(:songs).select("artists.*, string_agg(title, ', ') as list").group(:id)`
Use `.first.list` to see that Prince's list result will be: "Raspberry Beret, Purple Rain"

</section>