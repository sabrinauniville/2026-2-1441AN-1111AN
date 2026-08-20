import { environment } from "../../environment.js";

export class NasaService {
  constructor(config = environment) {
    this.apiUrl = config.nasaApiUrl;
    this.neoWsUrl = config.nasaNeoWsUrl;
    this.weatherApiUrl = config.nasaInsightWeatherUrl;
    this.apiKey = config.nasaApiKey;
  }

  async fetchJsonWithTimeout(url, timeoutMs = 15000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) {
        throw new Error(
          `Falha na requisição: ${response.status} ${response.statusText}.`,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error(
          "Tempo limite de conexão excedido. Verifique sua internet e tente novamente.",
        );
      }

      if (error instanceof Error && error.message) {
        throw error;
      }

      throw new Error(
        "Falha na requisição. Verifique sua internet e tente novamente.",
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async getPhotoOfTheDay(startDate = "", endDate = "") {
    const params = new URLSearchParams({ api_key: this.apiKey });

    if (startDate) {
      params.set("start_date", startDate);
    }

    if (endDate) {
      params.set("end_date", endDate);
    }

    const url = `${this.apiUrl}?${params.toString()}`;
    return this.fetchJsonWithTimeout(url);
  }

  async getNeoWs(startDate = "", endDate = "") {
    const params = new URLSearchParams({ api_key: this.apiKey });

    if (startDate) {
      params.set("start_date", startDate);
    }

    if (endDate) {
      params.set("end_date", endDate);
    }

    const url = `${this.neoWsUrl}?${params.toString()}`;
    return this.fetchJsonWithTimeout(url);
  }

  async getInsightWeather(startDate = "", endDate = "") {
    const params = new URLSearchParams({
      api_key: this.apiKey,
      feedtype: "json",
      ver: "1.0",
    });

    if (startDate) {
      params.set("start_date", startDate);
    }

    if (endDate) {
      params.set("end_date", endDate);
    }

    const urls = [
      `${this.weatherApiUrl}?${params.toString()}`,
      `${this.weatherApiUrl.replace(/\/?$/, "/")}?${params.toString()}`,
    ];

    for (const url of urls) {
      try {
        return await this.fetchJsonWithTimeout(url);
      } catch (error) {
        const isLastAttempt = url === urls[urls.length - 1];
        if (isLastAttempt) {
          throw error;
        }

        if (
          !(error instanceof Error) ||
          !/404|Not Found|Failed to fetch/i.test(error.message)
        ) {
          throw error;
        }
      }
    }

    throw new Error("Erro ao consultar API de clima da NASA.");
  }
}
