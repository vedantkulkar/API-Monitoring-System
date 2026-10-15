let apiChart;
let responseTimeChart;

function loadDashboard() {
	

fetch("http://localhost:8080/api/all")
.then(response => response.json())
.then(data => {
	
	console.log(data);
	
	let total = data.length;
	let up = data.filter(api => api.status === "UP").length;
	let down = data.filter(api => api.status === "DOWN").length;
	
	// Update dashboard statistics
	document.getElementById("totalApis").innerText = total;
	document.getElementById("upApis").innerText = up;
	document.getElementById("downApis").innerText = down;
	
	// API HEALTH PIE CHART
	
	if (apiChart) {
		apiChart.destroy();
	}
	
	apiChart = new Chart(document.getElementById("apiChart"), {
		
		type: "pie",
		
		data: {
			labels: ["UP APIs", "DOWN APIs"],
			
			datasets: [{
				data: [up, down]
			}]
		},
		
		options: {
			responsive: true,
			maintainAspectRatio: false 
		}
	});
	
	//RESPONSE TIME BAR CHART
	
	if (responseTimeChart) {
		responseTimeChart.destroy();
	}
	
	responseTimeChart = new Chart(
		document.getElementById("responseTimeChart"),
	    {
		
		  type: "bar",
		
		  data: {
			
			labels: data.map(api => api.name),
			
			datasets: [{
				
				label: "Response Time (ms)",
				
				data: data.map(api => api.responseTime)
				
			}]
			
		},
		
		options: {
			
			responsive: true,
			
			maintainAspectRatio: false,
			
			scales: {
				
				y: {
					
					beginAtZero: true,
					
					title: {
						
						display: true,
						
						text: "Response Time (ms)"
						
					}
					
				},
				
				x: {
					
					title: {
						
						display: true,
						
						text: "APIs"
						
						}
						
					}
					
				}
				
			}
			
		}
	);
	
	 // UPDATE API TABLE
	

	let table = document.getElementById("apiTable");
	
	table.innerHTML = "";
	
	
	
	data.forEach(api => {
		
		let row = `
		
		   <tr>
		   
		       <td>${api.id}</td>
			   
			   <td>${api.name}</td>
			   
			   <td>${api.url}</td>
			   
			   <td>
			   <span class="badge ${
				   api.status === 'UP' 
				   ? 'bg-success'
				   : 'bg-danger'
			   }">
			   
			   
			       ${api.status}
				   
				</span>
				
				</td>
				
			   <td>${api.responseTime} ms</td>
			   
			   <td>
			       <button 
				       class="btn btn-warning btn-sm" 
				       onclick="editApi(${api.id}, '${api.name}', '${api.url}')">
					   
				       Edit
					   
				   </button>
				   
			       <button 
				   class="btn btn-danger btn-sm"
				   onclick="deleteApi(${api.id})">
				   
				      Delete
					 
				  </button>
				  
			   </td>
			   
		  </tr>
		  
	`;
		
		table.innerHTML += row;
		
	});
	
})

 .catch(error => console.log(error));
}

// Load dashboard when page opens
loadDashboard();

setInterval(loadDashboard, 10000);

function addApi() {
	
	let apiName = document.getElementById("apiName").value;
	let apiUrl = document.getElementById("apiUrl").value;
	
	fetch("http://localhost:8080/api/add",{
		
		method: "POST",
		
		headers: {
			"Content-Type": "application/json"
		},
		
		body: JSON.stringify({
			name: apiName,
			url: apiUrl
		})
		
		
	})
	
	.then(response => response.json())
	
	.then(data => {
		
		alert("API Added Successfully!");
		location.reload();
	})
	
	.catch(error => console.log(error));
}


function deleteApi(id) {
	
	if(confirm("Are you sure want to delete this API?")) {
		
	fetch("http://localhost:8080/api/delete/" + id, {
		method: "DELETE"
	})
	.then(() => location.reload())
	.catch(error => console.log(error));
	}
}

function editApi(id, name, url) {
	
	let newName = prompt("Enter New API Name:", name);
	let newUrl = prompt("Enter New API URL:", url);
	
	if(newName == null || newUrl == null) {
		return;
	}
	
	fetch("http://localhost:8080/api/update/" + id, {
		
		method : "PUT",
		
		headers: {
			"Content-Type": "application/json"
		},
		
		body: JSON.stringify({
			name: newName,
			url: newUrl
		})
		
	})
	
	.then(response => response.json())
	
	.then(data => {
		alert("API Updated Successfully!");
		location.reload();
	})
	
	.catch(error => console.log(error));
}


let searchBox = document.getElementById("searchBox");

if (searchBox) {
	
	searchBox.addEventListener("keyup", function() {
		
		let value = this.value.toLowerCase();
		
		let rows = document.querySelectorAll("#apiTable tr");
		
		rows.forEach(row  => {
			
			let text = row.innerText.toLowerCase();
			
			row.style.display = text.includes(value) ? "" : "none";
		
	});
});

}

console.log("Script Loaded");