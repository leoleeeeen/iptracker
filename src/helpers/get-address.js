export async function getAddress(ip = '8.8.8.8') {
    const response = await fetch(`https://ip-intelligence.abstractapi.com/v1/?api_key=f3e519a813fb4bcd86b4992f5bea92f9&ip_address=${ip}`)
    return response.json();
}