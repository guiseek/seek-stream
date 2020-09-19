import { ClientModel } from '@seek-stream/core-domain';

export class ClientService {
  private clients: ClientModel[] = [];

  processData(data: ClientModel) {
    this.clients.push(data);
  }

  getAllClients() {
    return this.clients;
  }

  getClient(clientID: string) {
    return this.clients.find((c) => c.id === clientID);
  }

  existClient(clientID: string) {
    return this.clients.some((c) => c.id === clientID);
  }

  existClientName(clientName: string) {
    return this.clients.some((c) => c.name === clientName);
  }

  removeClient(clientID: string) {
    const foundClient = this.clients.findIndex((c) => c.id === clientID);
    return this.clients.splice(foundClient, 1);
  }

  updateClient({ id: clientID, updateData: newData }) {
    const clientIndex = this.clients.findIndex(
      (client) => client.id === clientID
    );
    this.clients[clientIndex].room = newData.room;
  }

  getClientsFromRoom(roomID: string) {
    return this.clients.filter((c) => c.room === roomID);
  }
}
