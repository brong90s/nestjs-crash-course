### Associations with Nest and TypeORM
* Figure out what kind of association we are modeling
* Add the appropriate decorators to our related entities
* Associate the records when one is created
* Apply a serializer to limit info shared

#### One-To-One Relationships
Country <--> Capital
Car <--> Engine
Passport <--> Person
Person <--> Cell Phone

#### One-to-Many // Many-to-One Relationships
Customers <--> Orders
Car <--> Parts
Country <--> Cities
Continenet <--> Mountains

#### Many-to-Many Relationships
Trains <--> Riders
Classes <--> Students
Parties <--> Students
Album <--> Genre
