const storedData = JSON.parse(localStorage.getItem('StudentIn'));

let displayName = 'Student';
let photoURL = '/assets/images/avatars/avatar_11.jpg'; // Default photo URL

if (storedData && storedData.name) {
  displayName = storedData.name;
}

if (storedData && storedData.gender) {
  photoURL =
    storedData.gender === 'Male'
      ? '/assets/images/avatars/avatar_12.jpg'
      : storedData.gender === 'Female'
      ? '/assets/images/avatars/avatar_1.jpg'
      : '/assets/images/avatars/avatar_11.jpg';
}

const account = {
  displayName,
  photoURL,
};

export default account;
