import { useState } from 'react';

import './App.css';

import {
  // PetProfile,
  Pets
} from './ui-components';

import { NavBar } from './ui-components';

import { Footer } from './ui-components';

import { AddPet } from './ui-components';

import { PetDetails } from './ui-components';

import { withAuthenticator } from '@aws-amplify/ui-react';

import { Storage } from "@aws-amplify/storage"

function App({ user, signOut}) {

  async function saveFile() {
    await Storage.put("test.txt", "Hello");
  }

  // const petProfileOverride = {
  //   Breed: { color: "blue" },
  // };

  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [pet, setPet] = useState();

  const [updatePet, setUpdatePet] = useState();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [about, setAbout] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");

  const navBarOverride = {
    image: {
      src: user?.attributes?.profile,
      // src: "https://img.icons8.com/color/50/000000/fish"
    },
    "Add Pet": {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        saveFile();
        setShowForm(!showForm);
      }
    },
    Button: {
      onClick: signOut,
    },
  };

  const addPetFormOverride = {
    Icon: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowForm(false);
      }
    },
    TextField29766922: {
      placeholder: name,
    },
    TextField29766923: {
      placeholder: age,
    },
    TextField29766924: {
      placeholder: breed,
    },
    TextField36652685: {
      placeholder: about,
    },
    TextField36652692: {
      placeholder: color,
    },
    TextField36652699: {
      placeholder: image
    },
    image: {
      src:
        updatePet == null
          ? "https://img.icons8.com/color/50/000000/fish"
          : updatePet.image,
    },
    Button29766926: {
      isDisabled: updatePet ? true : false,
    },
    Button36652707: {
      isDisabled: !updatePet ? true : false,
    }
  }

  const showDetailsOverride = {
    Close: {
      style: {
        cursor: "pointer",
      },
      onClick: () => {
        setShowDetails(false);
      }
    }
  }

  return (
    <div className="App">
      <NavBar width={"100%"}
        overrides={navBarOverride}
      />

      <header className="App-header">
        {showDetails && (
          <PetDetails
            pet={pet}
            overrides={showDetailsOverride}
            style={{
              textAlign: "left",
              margin: "1rem",
            }}
          />
        )}

        {showForm && (
          <AddPet
            pet={updatePet}
            overrides={addPetFormOverride}
            style={{
              textAlign: "left",
              margin: "1rem",
            }}
          />
        )}

        <Pets
          overrideItems={({ item, index }) => ({
            overrides: {
              Breed: { color: "blue" },

              Button29766907: {
                onClick: () => {
                  setShowDetails(!showDetails);
                  setPet(item);
                }
              },

              Button36562708: {
                onClick: () => {
                  if (!showForm) {
                    setShowForm(true);
                  }
                  setUpdatePet(item);
                  setName(item.name);
                  setAge(item.age);
                  setBreed(item.breed);
                  setAbout(item.about);
                  setColor(item.color);
                  setImage(item.image);
                }
              }
            },
          })}
        />
        {/* <PetProfile
          overrides={petProfileOverride}
        /> */}
      </header>

      <Footer width={"100%"} />
    </div>
  );
}

export default withAuthenticator(App);
