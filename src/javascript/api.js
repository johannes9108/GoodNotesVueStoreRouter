export default class Api {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    // console.log("Get ALL");
    try {
      let promise = fetch(this.url, {
        method: "GET",
      });
      // console.log("Promise: " + promise);

      let response = await promise;
      // console.log("Response: " + response);

      let data = await response.json();

      // console.log("Data: " + data);
      return data;
    } catch (error) {
      console.log("Corrupted Data");
    }
  }

  getSingle(id) {
    console.log(id);
    console.log("Get Single");
  }

  async create(note) {
    console.log(note);
    console.log("Create Single");
    console.log(JSON.stringify(note));
    try {
      let promise = fetch(this.url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Promise: " + promise);

      let response = await promise;
      console.log("Response: " + response);

      let data = await response.json();

      console.log("Data: " + data);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Corrupted Data");
    }
  }

  async update(note) {
    // console.log(note);
    // console.log("Update Single");

    try {
      let promise = fetch(this.url + "/" + note.id, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Promise: " + promise);

      let response = await promise;
      console.log("Response: " + response);

      let data = await response.json();

      console.log("Data: " + data);
      console.log(data);
      return data;
    } catch (error) {
      console.log("Corrupted Data");
    }
  }

  async delete(id) {
    console.log(id);
    console.log("Delete Single");

    try {
      let promise = fetch(this.url + "/" + id, {
        method: "DELETE",
      });
      console.log("Promise: " + promise);

      let response = await promise;
      console.log("Response: " + response);

      let data = await response.json();

      console.log("Data: " + data);
      return data;
    } catch (error) {
      console.log("Corrupted Data");
    }
  }
}
