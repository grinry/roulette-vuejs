import { APIConfigurationResponse, RouletteTableItemColor } from '@/interfaces';

export const mapColor = (number: number, data: APIConfigurationResponse): RouletteTableItemColor => {
  const index = data.results.indexOf(String(number)); // Can be removed if key and value pairs in results always same.
  return data.colors[index];
};

export const mapColorToClass = (color: RouletteTableItemColor): string => {
  switch (color) {
    case 'green':
      return 'bg-success';
    case 'red':
      return 'bg-danger';
    case 'black':
      return 'bg-dark';
  }
};
