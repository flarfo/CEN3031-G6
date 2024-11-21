import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Welcome to Our School Club</h1>
      
      {/* Description Section */}
      <div style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          Welcome to our "___" club! We're a group of passionate students who work together on exciting projects and activities. 
          Join us to collaborate, learn new skills, and make lasting memories. 
          Whether you're interested in __, __ or __ there's a place for you in our club.
        </p>
      </div>

      {/* Image Section */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <img 
          src="https://www.cise.ufl.edu/wp-content/uploads/2020/12/2016-05-31_Campus-Scenes-4768sm-300x200.jpg" 
          alt="Club activity 1" 
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} 
        />
        <img 
          src="https://www.wruf.com/wp-content/uploads/2017/10/IMG_6858-300x200.jpg" 
          alt="Club activity 2" 
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} 
        />
        <img 
          src="https://admissionsight.com/wp-content/uploads/2020/09/shutterstock_778279348-300x200.jpg" 
          alt="Club activity 3" 
          style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '10px' }} 
        />
      </div>
    </div>
  );
};

export default Home;
