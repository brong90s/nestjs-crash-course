import { Expose, Transform } from 'class-transformer'

// The main purpose of this 'ReportDo' is to take a report entity instance and convert it into object that has all below properties.
// During that conversion, we can choose to Exclude or add in branch new properties as well.
// To generate a new property that is going to pull some information from the original report entity, so we are going to use '@Transform()' decorator.
export class ReportDto {
  @Expose()
  id: number
  @Expose()
  price: number
  @Expose()
  year: number
  @Expose()
  lng: number
  @Expose()
  lat: number
  make: string
  @Expose()
  model: string 
  @Expose()
  mileage: number
  @Expose()
  approved: boolean

  // '@Transform()' decorator is going to be called with a function, and we're going to destructure of the argument list. We're also going to pull out something call 'obj'.
  // 'obj' is a reference to the original report entity. We're going to take a look at user property and from the user, we're going to pull out the 'id'.
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  // after process done in '@Transform()' then 'obj.user.id' is going to be assign to 'userId'
  userId: number
}