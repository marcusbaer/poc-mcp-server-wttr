#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// https://www.youtube.com/watch?v=Y4bpWRLdRoA

const SERVICE_API = 'https://wttr.in';

interface WeatherCondition {
    weatherDesc: Array<{ value: string }>;
    temp_C: string;
    FeelsLikeC: string;
    humidity: string;
    windspeedKmph: string;
    winddir16Point: string;
    precipMM: string;
    visibility: string;
    pressure: string;
    cloudcover: string;
}

interface WeatherDay {
    date: string;
    maxtempC: string;
    mintempC: string;
    avgtempC: string;
    totalSnow_cm: string;
    sunHour: string;
    uvIndex: string;
    hourly: WeatherCondition[];
}

interface WeatherArea {
    areaName: Array<{ value: string }>;
    country: Array<{ value: string }>;
    region: Array<{ value: string }>;
}

interface WeatherResponse {
    current_condition: WeatherCondition[];
    weather: WeatherDay[];
    nearest_area: WeatherArea[];
}

async function makeRequest<T>(city: string): Promise<T | null> {
    try {
        const response = await fetch(`${SERVICE_API}/${encodeURIComponent(city)}?format=j1`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.status} ${response.statusText}`);
        }
        return (await response.json()) as T;
    } catch (error: any) {
        console.error(`Network error: ${error.message}`);
        return null;
    }
}

function formatWeatherReport(data: WeatherResponse, city: string): string {
    const area = data.nearest_area[0];
    const current = data.current_condition[0];
    const today = data.weather[0];
    
    let report = `# Wetter für ${area.areaName[0].value}, ${area.country[0].value}\n\n`;
    
    report += `## Aktuelles Wetter\n`;
    report += `- **Bedingung:** ${current.weatherDesc[0].value}\n`;
    report += `- **Temperatur:** ${current.temp_C}°C (gefühlt ${current.FeelsLikeC}°C)\n`;
    report += `- **Luftfeuchtigkeit:** ${current.humidity}%\n`;
    report += `- **Wind:** ${current.windspeedKmph} km/h aus ${current.winddir16Point}\n`;
    report += `- **Niederschlag:** ${current.precipMM} mm\n`;
    report += `- **Sicht:** ${current.visibility} km\n`;
    report += `- **Luftdruck:** ${current.pressure} mb\n`;
    report += `- **Bewölkung:** ${current.cloudcover}%\n\n`;
    
    report += `## Heute (${today.date})\n`;
    report += `- **Min/Max:** ${today.mintempC}°C / ${today.maxtempC}°C\n`;
    report += `- **Durchschnitt:** ${today.avgtempC}°C\n`;
    report += `- **Sonnenstunden:** ${today.sunHour}\n`;
    report += `- **UV-Index:** ${today.uvIndex}\n`;
    if (today.totalSnow_cm !== "0.0") {
        report += `- **Schnee:** ${today.totalSnow_cm} cm\n`;
    }
    
    if (data.weather.length > 1) {
        report += `\n## Vorhersage\n`;
        for (let i = 1; i < Math.min(3, data.weather.length); i++) {
            const day = data.weather[i];
            report += `\n### ${day.date}\n`;
            report += `- **Temperatur:** ${day.mintempC}°C - ${day.maxtempC}°C\n`;
            if (day.hourly.length > 0) {
                const midday = day.hourly[Math.floor(day.hourly.length / 2)];
                report += `- **Bedingung:** ${midday.weatherDesc[0].value}\n`;
            }
        }
    }
    
    return report;
}

const server = new McpServer({
    name: 'wttr.in',
    version: '1.0.0',
    // capabilities: {
    //     resources: {},
    //     tools: {},
    // }
});

server.tool(
    'get-forecast',
    'Forecast the weather for a given city',
    {
        city: z.string().describe('City name, e.g., London'),
    },
    async ({ city }) => { 
        const weatherData = await makeRequest<WeatherResponse>(city);
        
        if (!weatherData) {
            return {
                content: [
                    {
                        type: 'text',
                        text: `Fehler: Wetterdaten für "${city}" konnten nicht abgerufen werden. Bitte überprüfe den Stadtnamen.`,
                    }
                ]
            };
        }
        
        const report = formatWeatherReport(weatherData, city);
        
        return {
            content: [
                {
                    type: 'text',
                    text: report,
                }
            ]
        };
    }
);

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('MCP server for wttr.in is running on stdio...');
}

main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
});