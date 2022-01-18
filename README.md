### Associations with Nest and TypeORM
* Figure out what kind of association we are modeling
* Add the appropriate decorators to our related entities
* Associate the records when one is created
* Apply a serializer to limit info shared

#### One-To-One Relationships
Country <--> Capital <br />
Car <--> Engine <br />
Passport <--> Person <br />
Person <--> Cell Phone <br />

#### One-to-Many // Many-to-One Relationships
Customers <--> Orders <br />
Car <--> Parts <br />
Country <--> Cities <br />
Continenet <--> Mountains <br />

#### Many-to-Many Relationships
Trains <--> Riders <br />
Classes <--> Students <br />
Parties <--> Students <br />
Album <--> Genre <br />
