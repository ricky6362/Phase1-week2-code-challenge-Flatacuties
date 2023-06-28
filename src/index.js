document.addEventListener('DOMContentLoaded', () => {
    const characterBar = document.querySelector('#character-bar');
    const detailedInfo = document.querySelector('#detailed-info');
    const voteCount = document.querySelector('#vote-count');
    const votesForm = document.querySelector('#votes-form');
    
    // Function to fetch characters data from the server
    const fetchCharacters = async () => {
      const response = await fetch('http://localhost:3000/characters');
      const characters = await response.json();
      return characters;
    };
    
    // Function to fetch a character's details by ID
    const fetchCharacterDetails = async (id) => {
      const response = await fetch(`http://localhost:3000/characters/${id}`);
      const character = await response.json();
      return character;
    };
    
    // Function to update the character's details in the detailed-info section
    const updateCharacterDetails = (character) => {
      const characterName = document.querySelector('#name');
      const characterImage = document.querySelector('#image');
    
      characterName.textContent = character.name;
      characterImage.src = character.image;
      voteCount.textContent = character.votes;
    };
    
    // Function to handle when a character is clicked
    const handleCharacterClick = async (event) => {
      if (event.target.tagName === 'SPAN') {
        const characterId = event.target.dataset.id;
        const character = await fetchCharacterDetails(characterId);
        updateCharacterDetails(character);
      }
    };
    
    // Function to handle when the votes form is submitted
    const handleVotesFormSubmit = (event) => {
      event.preventDefault();
    
      const votesInput = document.querySelector('#votes');
      const votes = parseInt(votesInput.value);
    
      if (!isNaN(votes) && votes >= 0) {
        const currentVotes = parseInt(voteCount.textContent);
        const totalVotes = currentVotes + votes;
        voteCount.textContent = totalVotes;
      }
    
      votesInput.value = '';
    };
    
    // Add event listener to character bar for click events
    characterBar.addEventListener('click', handleCharacterClick);
    
    // Add event listener to votes form for form submission
    votesForm.addEventListener('submit', handleVotesFormSubmit);
    
    // Fetch characters and populate the character bar
    fetchCharacters().then(characters => {
      characters.forEach(character => {
        const span = document.createElement('span');
        span.textContent = character.name;
        span.dataset.id = character.id;
        characterBar.appendChild(span);
      });
    });
  });
  