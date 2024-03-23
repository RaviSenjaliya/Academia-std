import { useEffect } from 'react';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sample } from 'lodash';

// ----------------------------------------------------------------------


// useEffect(() => {
//   const data = localStorage.getItem("EMSdata")
//   const p = JSON.parse(data)
//   axios.get("http://localhost:4000/accounts", {
//     headers: {
//       "Authorization": 'Bearer' + p?.jwtToken
//     }
//   }).then(
//     e => {

//       console.log(e.data);
//     }
//   ).catch(
//     y => {
//       console.log(y);
//     }
//   )
// }, []);
const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.company.name(),
  isVerified: faker.datatype.boolean(),
  status: sample(['active', 'banned']),
  role: sample([
    'Leader',
    'Hr Manager',
    'UI Designer',
    'UX Designer',
    'UI/UX Designer',
    'Project Manager',
    'Backend Developer',
    'Full Stack Designer',
    'Front End Developer',
    'Full Stack Developer',
  ]),

}));

export default users;
