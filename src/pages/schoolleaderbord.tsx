import React from 'react'
import Leaderbord from '../components/Leaderbord'
import Layout from './Layout';

function schoolleaderbord() {
  return (
    <><Layout>
      <Leaderbord
        name="your school"
        number={78}
        name1="Shree Ram"
        name2="Harsh Jani"
        name3="rudra joshi"
      />
    </Layout>
    </>
  );
}

export default schoolleaderbord