import User from '/repositories/user/user';
import City from '/repositories/city/city';
import Timezone from '/repositories/timezone/timezone';
import Branch from '/repositories/branch/branch';
import Facility from '/repositories/facility/facility';
export const repository = ($axios) => ({
  user: User($axios),
  city: City($axios),
  timezone: Timezone($axios),
  branch: Branch($axios),
  facility: Facility($axios)
})
