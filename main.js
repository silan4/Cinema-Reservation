/**istenen işlev -1 için çözüm aşamaları
 * Tıklanılan koltuğa ulaşmak için container div ini çek
 * container bir olay dinleyicisi ekle (addEventListener)
 * 
*/

const container = document.querySelector(".container");
//console.log(container)

const infoText = document.querySelector(".infoText");
//console.log(infoText)

const totalSeatCount = document.getElementById("count");
//console.log(totalSeatCount)
const totalPrice = document.getElementById("amount");
//console.log(totalPrice)
const movieSelect = document.getElementById("movie");
//console.log(movieSelect.options[movieSelect.selectedIndex].value)

const allSeats = document.querySelectorAll(".seat:not(.reserve)");
//console.log(allSeats)

const saveToDatabase = (willSaveIndex) => {
  // Veriyi JSON formatına çevirme
  const jsonIndex = JSON.stringify(willSaveIndex);
  // Veri Tabanına koltukları kayıt etme
  localStorage.setItem("seatIndex", jsonIndex);

  localStorage.setItem("movieIndex", JSON.stringify(movieSelect.selectedIndex));
};

const getFromDataBase = () => {
  // seatIndex'i al ve JSON parse yap
  let dbSelectedIndex;
  try {
    dbSelectedIndex = JSON.parse(localStorage.getItem("seatIndex"));
  } catch (e) {
    console.error("Geçersiz JSON verisi (seatIndex):", e);
    dbSelectedIndex = null;
  }

  if (dbSelectedIndex !== null) {
    allSeats.forEach((seat, index) => {
      if (dbSelectedIndex.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  // movieIndex'i al ve JSON parse yap
  let dbSelectedMovie;
  try {
    dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  } catch (e) {
    console.error("Geçersiz JSON verisi (movieIndex):", e);
    dbSelectedMovie = null;
  }

  if (dbSelectedMovie !== null) {
    movieSelect.selectedIndex = dbSelectedMovie;
  }
};


getFromDataBase();

const createIndex = () => {
  // console.log('45',getFromDataBase())
  const allSeatsArray = [];

  allSeats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  //console.log('51',getFromDataBase())
  //console.log(allSeatsArray)

  const allSelectedSeatsArray = [];

  const selectedSeats = container.querySelectorAll(".seat.selected");
  //console.log(selectedSeats)
  //console.log('58',getFromDataBase())
  selectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  const selectedIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  //console.log('66',getFromDataBase())
  //console.log(selectedIndex)
  saveToDatabase(selectedIndex);
  //console.log('69',getFromDataBase())
};

//Toplam Fiyat Hesaplama Fonksşoynu

function calculateTotal() {
  createIndex();
  const selectedSeatCounts =
    container.querySelectorAll(".seat.selected").length;
  // console.log(selectedSeatCounts)
  totalSeatCount.innerText = selectedSeatCounts;

  let selectedMoviePrice = movieSelect.options[movieSelect.selectedIndex].value;
  //console.log(selectedMoviePrice)

  totalPrice.innerText = selectedSeatCounts * selectedMoviePrice;
  if (selectedSeatCounts > 0) {
    //  console.log(selectedSeatCounts);
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
}
calculateTotal();

container.addEventListener("click", (pointerEvent) => {
  // console.log('Container Tıklandı')

  const clickedSeat = pointerEvent.target.offsetParent;
  //  console.log(pointerEvent.target.offsetParent);

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserve")
    // && !clickedSeat.classList.contains("selected")
  ) {
    clickedSeat.classList.toggle("selected");

    // clickedSeat.classList.add("selected");
  }
  //   else if (
  //     clickedSeat.classList.contains("seat") &&
  //     !clickedSeat.classList.contains("reserve") &&
  //     clickedSeat.classList.contains("selected")
  //   ) {
  //     clickedSeat.classList.remove("selected");
  //   }
  calculateTotal();
});
movieSelect.addEventListener("change", () => {
  calculateTotal();
});