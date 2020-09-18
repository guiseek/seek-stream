import { ClientService } from './client.service';

const client = { id: '1', name: 'Seek', room: 'Stream' };

describe('ServerPlayer ClientService', () => {
  let service: ClientService;
  beforeEach(() => {
    service = new ClientService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should have as clients array', () => {
    expect(service.getAllClients()).toBeInstanceOf(Array);
  });

  it('should new client added', () => {
    service.processData(client);
    const clients = service.getAllClients();
    expect(clients.length).toBeGreaterThan(0);
  });

  it('should exist an client', () => {
    service.processData(client);
    expect(service.existClient('1')).toBeTruthy();
  });

  it('should exist an client with name', () => {
    service.processData(client);
    expect(service.existClientName('Seek')).toBeTruthy();
  });

  it('should exist an remove client with id', () => {
    service.processData(client);
    const clients = service.getAllClients();

    expect(clients.length).toEqual(1);

    service.removeClient('1');

    expect(clients.length).toEqual(0);
  });

  it('should exist an update client with id', () => {
    service.processData(client);
    const newClient = { ...client, room: 'newRoom' };

    service.updateClient({ id: newClient.id, updateData: newClient });

    expect(service.getClient('1').room).toEqual('newRoom');
  });

  it('should get all clients from room', () => {
    new Array(4).fill(client).map((v) => {
      service.processData(v);
    });

    const clientsFromStream = service.getClientsFromRoom('newRoom');
    expect(clientsFromStream.length).toEqual(4);
  });
});
