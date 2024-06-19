import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private basic_url = 'http://localhost:8070/customer';   // common url path

  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of all customers from the server.
   * @returns An Observable response containing the list of customers in json format.
   */
  getAllCustomers(): Observable<any> {
    return this.http.get(this.basic_url + "/getall");
  }

  /**
   * Send a request to add a new customer to the server.
   * @param customer The customer object containing the details of the customer to be added.
   * @returns An Observable string response from the server in plain text format.
   */
  addCustomerDetails(customer: any): Observable<string> {
    return this.http.post<string>(this.basic_url + "/add", customer);
  }

  /**
   * Send a request to update a existing customer data to the server.
   * @param id The id of the customer to be updated.
   * @param customer The customer object containing the updated details of the customer.
   * @returns  An Observable string response from the server in plain text format.
   */
  updateCustomerDetails(customer: any): Observable<string> {
    return this.http.put<string>(this.basic_url + "/update", customer);
  }

  /**
   * Sends a request to delete an existing customer from the server.
   * @param id The id of the customer to be delete its data.
   * @returns An Observable string response from the server in plain text format.
   */
  deleteCustomer(id: number): Observable<string> {
    return this.http.delete<string>(`${this.basic_url}/delete/${id}`, {responseType: 'text' as 'json'});
  }

}
