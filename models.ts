import type { ModelYear, Variant, BikeColor } from './types';

export interface BikeColorOption {
  id: BikeColor;
  label: string;
  note: string;
}

const options = (
  items: Array<[BikeColor, string, string]>,
): BikeColorOption[] => items.map(([id, label, note]) => ({ id, label, note }));

export const VARIANT_OPTIONS: Record<ModelYear, Variant[]> = {
  '2013': ['ES', 'ESD'],
  '2014': ['ES', 'ESD'],
  '2015': ['ESD', 'ESDD'],
  '2015/2016': ['ESDD'],
  '2016': ['ESDD', 'ES'],
  '2016/2017': ['ESDD', 'ES'],
  '2017': ['ESDD', 'ES'],
  '2017/2018': ['ESDD', 'ES'],
  '2018': ['CBS', 'ES'],
  '2018/2019': ['CBS'],
  '2019': ['CBS'],
  '2019/2020': ['CBS'],
  'FAN-2013': ['ESD'],
  'FAN-2014': ['ESD'],
  'FAN-2015': ['ESD'],
  'FAN-2016': ['ESD'],
  'FAN-2017': ['CBS'],
  'FAN-2018': ['CBS'],
  'FAN-2019': ['CBS'],
  'NXR-2020': ['CBS'],
  'NXR-2021': ['CBS'],
  'NXR-2022': ['CBS'],
  'NXR-2023': ['CBS'],
  'NXR-2024': ['CBS'],
  'NXR-2025': ['CBS', 'ABS'],
  'NXR-2026': ['CBS', 'ABS'],
  '2020': ['CBS'],
  '2020/2021': ['CBS'],
  '2021/2022': ['CBS'],
  '2021': ['CBS'],
  '2022': ['CBS'],
  '2022/2023': ['CBS'],
  '2023/2024': ['CBS'],
  '2023': ['CBS'],
  '2024': ['CBS'],
  '2024/2025': ['CBS'],
  '2025': ['CBS'],
  '2025/2026': ['CBS', 'ABS'],
  '2026': ['CBS'],
  'START-2026': ['CBS'],
  'START-2022': ['CBS'],
  'START-2015': ['ES'],
  'CARGO-2013': ['ESD'],
  'CARGO-2014': ['ESD'],
  'CARGO-2015': ['ESD'],
  'CARGO-2016': ['ESD'],
  'CARGO-2017': ['ESD'],
  'CARGO-2018': ['CBS'],
  'CARGO-2019': ['CBS'],
  'CARGO-2020': ['CBS'],
  'CARGO-2021': ['CBS'],
  'CARGO-2022': ['CBS'],
  'CARGO-2023': ['CBS'],
  'CARGO-2024': ['CBS'],
  'CARGO-2025': ['CBS'],
  'CARGO-2026': ['CBS'],
  'TITAN-2026': ['ABS'],
};

export function getVariantOptions(year: ModelYear): Variant[] { return VARIANT_OPTIONS[year]; }
export function defaultVariantForYear(year: ModelYear): Variant { return VARIANT_OPTIONS[year][0]; }
export function variantLabel(variant: Variant): string {
  return variant === 'ABS' ? 'ABS' : variant === 'CBS' ? 'CBS' : variant === 'ES' ? 'ES' : variant === 'ESD' ? 'ESD' : variant === 'KS' ? 'KS' : 'ESDD';
}
export function variantDescription(variant: Variant, _year?: ModelYear): string {
  if (variant === 'ABS') return 'Antitravamento';
  if (variant === 'CBS') return 'Combinado';
  if (variant === 'KS') return 'Tambor dianteiro';
  if (variant === 'ES') return 'Tambor dianteiro';
  if (variant === 'ESD') return 'Disco dianteiro';
  return 'Dois discos';
}

export const COLOR_OPTIONS: Record<ModelYear, Partial<Record<Variant, BikeColorOption[]>>> = {
  '2013': {
    ESD: options([
      ['vermelha', 'Vermelha', '2013 · NXR 150 Bros'],
      ['preta', 'Preta', '2013 · NXR 150 Bros'],
      ['verde', 'Verde', '2013 · NXR 150 Bros'],
    ]),
    ES: options([
      ['vermelha', 'Vermelha', '2013 · NXR 150 Bros'],
      ['preta', 'Preta', '2013 · NXR 150 Bros'],
      ['verde', 'Verde', '2013 · NXR 150 Bros'],
    ]),
    ESDD: [], CBS: [], ABS: [],
  },
  '2014': { ESD: options([['vermelha', 'Vermelha', '2014 · NXR 150 Bros'], ['branca', 'Branca', '2014 · NXR 150 Bros'], ['azul', 'Azul (Edição Especial)', '2014 · NXR 150 Bros · Edição Especial'], ['preta', 'Preta', '2014 · NXR 150 Bros']]), ES: options([['vermelha', 'Vermelha', '2014 · NXR 150 Bros'], ['branca', 'Branca', '2014 · NXR 150 Bros'], ['azul', 'Azul (Edição Especial)', '2014 · NXR 150 Bros · Edição Especial'], ['preta', 'Preta', '2014 · NXR 150 Bros']]), ESDD: [], CBS: [], ABS: [] },
  '2015': { ESD: options([
      ['vermelha', 'Vermelha/Branca', '2015 · ESD · combinação oficial'],
      ['branca', 'Branca/Preta', '2015 · ESD · combinação oficial'],
      ['preta', 'Preta/Cinza', '2015 · ESD · combinação oficial'],
    ]), ESDD: options([
      ['vermelha', 'Vermelha/Branca', '2015 · combinação oficial'],
      ['branca', 'Branca/Preta', '2015 · combinação oficial'],
      ['preta', 'Preta/Cinza', '2015 · combinação oficial'],
    ]), CBS: [], ABS: [] },
  '2015/2016': { ESD: [], ESDD: options([
      ['preta', 'Preta/Cinza', '2015 · combinação oficial'],
      ['vermelha', 'Vermelha/Branca', '2015 · combinação oficial'],
      ['branca', 'Branca/Preta', '2015 · combinação oficial'],
    ]), CBS: [], ABS: [] },
  '2016': {
    ESD: [],
    ES: options([
      ['vermelha', 'Vermelha/Branca', '2016 · ES'],
      ['preta', 'Preta', '2016 · ES'],
    ]),
    ESDD: options([
      ['vermelha', 'Vermelha/Preta', '2016 · ESDD'],
      ['branca', 'Branca/Preta', '2016 · ESDD'],
      ['preta', 'Preta', '2016 · ESDD'],
    ]), CBS: [], ABS: [] },
  '2016/2017': {
    ESDD: options([
      ['vermelha', 'Vermelha/Branca', '2017 · ESDD · combinação oficial'],
      ['azul', 'Azul/Branca', '2017 · ESDD · combinação oficial'],
    ]),
    ES: options([
      ['preta', 'Preta', '2017 · ES'],
      ['branca', 'Branca', '2017 · ES'],
    ]), ESD: [], CBS: [], ABS: [],
  },
  '2017/2018': {
    ESDD: options([
      ['vermelha', 'Vermelha/Branca', '2017/2018 · ESDD · combinação oficial'],
      ['azul', 'Azul/Branca', '2017/2018 · ESDD · combinação oficial'],
    ]),
    ES: options([
      ['preta', 'Preta', '2017/2018 · ES'],
      ['branca', 'Branca', '2017/2018 · ES'],
    ]), ESD: [], CBS: [], ABS: [],
  },
  '2017': {
    ESDD: options([
      ['vermelha', 'Vermelha/Branca', '2017 · ESDD'],
      ['azul', 'Azul/Branca', '2017 · ESDD'],
    ]),
    ES: options([
      ['preta', 'Preta/Branca', '2017 · ES'],
      ['branca', 'Branca', '2017 · ES'],
    ]), ESD: [], CBS: [], ABS: [],
  },
  '2018': {
    CBS: options([
      ['laranja', 'Laranja/Branca', '2018 · ESDD/CBS'],
      ['vermelha', 'Vermelha/Preta', '2018 · ESDD/CBS'],
      ['azul', 'Azul/Preta', '2018 · ESDD/CBS'],
    ]),
    ES: options([
      ['preta', 'Preta', '2018 · versão de entrada · dois tambores'],
      ['branca', 'Branca', '2018 · versão de entrada · dois tambores'],
    ]), ESD: [], ESDD: [], ABS: [],
  },
  '2019': {
    CBS: options([
      ['branca', 'Branca/Vermelha', '2019 · ESDD/CBS'],
      ['vermelha', 'Vermelha/Preta', '2019 · ESDD/CBS'],
      ['azul', 'Azul/Preta', '2019 · ESDD/CBS'],
      ['laranja', 'Laranja/Cinza', '2019 · ESDD/CBS'],
    ]), ESD: [], ESDD: [], ES: [], ABS: [],
  },
  '2018/2019': {
    ESD: [], ESDD: [], CBS: options([
      ['laranja', 'Laranja/Branca', '2018'],
      ['vermelha', 'Vermelha/Preta', '2018'],
      ['azul', 'Azul/Preta', '2018'],
    ]), ABS: [],
  },
  '2019/2020': {
    ESD: [], ESDD: [], CBS: options([
      ['branca', 'Branca/Vermelha', '2019/2020 · 2019'],
      ['vermelha', 'Vermelha/Preta', '2019/2020'],
      ['azul', 'Azul/Preta', '2019/2020'],
      ['laranja', 'Laranja/Cinza', '2019/2020'],
    ]), ABS: [],
  },
  'FAN-2013': {
    ESD: options([
      ['preta', 'Preta', '2013 · CG 150 Fan ESDi · NH-1'],
      ['vermelha', 'Vermelha', '2013 · CG 150 Fan ESDi · R-351'],
      ['cinza', 'Cinza Metálico', '2013 · CG 150 Fan ESDi · Y-198'],
    ]), ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'FAN-2014': {
    ESD: options([
      ['preta', 'Preta', '2014 · CG 150 Fan ESDi · NH-1'],
      ['vermelha', 'Vermelha', '2014 · CG 150 Fan ESDi · R-206'],
      ['azul', 'Azul Twister Perolizado', '2014 · CG 150 Fan ESDi · PB-314P'],
    ]), ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'FAN-2015': {
    ESD: options([
      ['vermelha', 'Vermelha', '2015 · CG 160 Fan ESDi'],
      ['cinza', 'Cinza', '2015 · CG 160 Fan ESDi'],
      ['preta', 'Preta', '2015 · CG 160 Fan ESDi'],
    ]), ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'FAN-2016': {
    ESD: options([
      ['preta', 'Preta', '2016 · CG 160 Fan ESDi · NH1'],
      ['vermelha', 'Vermelha', '2016 · CG 160 Fan ESDi · R206'],
      ['cinza', 'Cinza Metálico', '2016 · CG 160 Fan ESDi · NH402M'],
    ]), ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'FAN-2017': {
    CBS: options([
      ['preta', 'Preta', '2017 · CG 160 Fan ESDi · CBS · Preto sólido'],
      ['vermelha', 'Vermelha', '2017 · CG 160 Fan ESDi · CBS · Vermelho sólido'],
    ]), ABS: [], ESDD: [], ES: [], KS: [], ESD: [],
  },
  'FAN-2018': {
    CBS: options([
      ['preta', 'Preta', '2018 · CG 160 Fan · CBS · NH-1'],
      ['branca', 'Branca', '2018 · CG 160 Fan · CBS · Branco Ross · NH-196'],
      ['vermelha', 'Vermelha', '2018 · CG 160 Fan · CBS · Vermelho Guarau · R-239'],
    ]), ABS: [], ESDD: [], ES: [], KS: [], ESD: [],
  },
  'FAN-2019': {
    CBS: options([
      ['preta', 'Preta', '2019 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelha', '2019 · CG 160 Fan · CBS'],
      ['cinza', 'Cinza Metálico', '2019 · CG 160 Fan · CBS'],
    ]), ABS: [], ESDD: [], ES: [], KS: [], ESD: [],
  },
  'NXR-2020': { ESD: [], ESDD: [], CBS: options([
      ['azul', 'Azul', '2020 · NXR 160 Bros ESDD · CBS'],
      ['preta', 'Preta', '2020 · NXR 160 Bros ESDD · CBS'],
      ['vermelha', 'Vermelha', '2020 · NXR 160 Bros ESDD · CBS'],
    ]), ABS: [] },
  'NXR-2021': { ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta', '2021 · NXR 160 Bros ESDD · CBS'],
      ['vermelha', 'Vermelha', '2021 · NXR 160 Bros ESDD · CBS'],
      ['azul', 'Azul', '2021 · NXR 160 Bros ESDD · CBS'],
    ]), ABS: [] },
  'NXR-2022': { ESD: [], ESDD: [], CBS: options([
      ['branca', 'Branca/Preta', '2022 · NXR 160 Bros ESDD · CBS'],
      ['preta', 'Preta/Dourada', '2022 · NXR 160 Bros ESDD · CBS'],
      ['vermelha', 'Vermelha/Branca', '2022 · NXR 160 Bros ESDD · CBS'],
    ]), ABS: [] },
  'NXR-2023': { ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta/Cinza', '2023 · NXR 160 Bros ESDD · CBS'],
      ['vermelha', 'Vermelha/Cinza', '2023 · NXR 160 Bros ESDD · CBS'],
      ['branca', 'Branca/Preta', '2023 · NXR 160 Bros ESDD · CBS'],
    ]), ABS: [] },
  'NXR-2024': { ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta', '2024 · NXR 160 Bros ESDD · CBS'],
      ['vermelha', 'Vermelha/Preta', '2024 · NXR 160 Bros ESDD · CBS'],
      ['branca', 'Branca/Azul', '2024 · NXR 160 Bros ESDD · CBS'],
    ]), ABS: [] },
  'NXR-2025': { ESD: [], ESDD: [], CBS: options([
      ['cinza', 'Cinza', '2025 · NXR 160 Bros CBS'],
      ['preta', 'Preta/Vermelha', '2025 · NXR 160 Bros CBS · preta com detalhes vermelho e branco (galeria oficial Honda)'],
      ['vermelha', 'Vermelha', '2025 · NXR 160 Bros CBS'],
    ]), ABS: options([
      ['preta', 'Preta/Vermelha', '2025 · NXR 160 Bros ABS · preta com detalhes vermelho e branco'],
      ['vermelha', 'Vermelha', '2025 · NXR 160 Bros ABS'],
    ]) },
  'NXR-2026': { ESD: [], ESDD: [], CBS: options([
      ['azul', 'Azul', '2026 · NXR 160 Bros CBS · Universe Blue'],
      ['vermelha', 'Vermelha', '2026 · NXR 160 Bros CBS · Fighting Red'],
    ]), ABS: options([
      ['cinza', 'Cinza', '2026 · NXR 160 Bros ABS · Tempestade Gray'],
      ['vermelha', 'Vermelha', '2026 · NXR 160 Bros ABS · Fighting Red'],
    ]) },
  '2020/2021': {
    ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta/Cinza', '2020/2021'],
      ['azul', 'Azul/Cinza e Preto', '2020/2021'],
      ['vermelha', 'Vermelha/Preta', '2020/2021'],
    ]), ABS: [],
  },
  '2021/2022': {
    ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta/Cinza', '2021/2022'],
      ['vermelha', 'Vermelha/Preta', '2021/2022'],
      ['azul', 'Azul/Cinza e Preto', '2021/2022'],
    ]), ABS: [],
  },
  '2022/2023': {
    ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta/Cinza', '2022/2023 · combinação oficial'],
      ['vermelha', 'Vermelha/Cinza', '2022/2023 · combinação oficial'],
      ['branca', 'Branca/Preta', '2022/2023 · combinação oficial'],
    ]), ABS: [],
  },
  '2023/2024': {
    ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta/Cinza', '2023/2024 · combinação da linha 2023'],
      ['vermelha', 'Vermelha/Cinza', '2023/2024 · combinação da linha 2023'],
      ['branca', 'Branca/Preta', '2023/2024 · combinação da linha 2023'],
    ]), ABS: [],
  },
  '2024/2025': {
    ESD: [], ESDD: [], CBS: options([
      ['preta', 'Preta/Azul', '2024/2025 · combinação oficial'],
      ['vermelha', 'Vermelha/Preta', '2024/2025 · combinação oficial'],
      ['branca', 'Branca/Azul', '2024/2025 · combinação oficial'],
    ]), ABS: [],
  },
  '2020': {
    CBS: options([
      ['prata', 'Prata Metálico', '2020 · CG 160 Fan · nova cor oficial da linha 2020'],
      ['preta', 'Preta', '2020 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelha', '2020 · CG 160 Fan · CBS'],
    ]), ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  '2021': {
    CBS: options([
      ['prata', 'Prata Metálico', '2021 · CG 160 Fan · CBS'],
      ['preta', 'Preto', '2021 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelho', '2021 · CG 160 Fan · CBS'],
    ]), ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  '2022': {
    CBS: options([
      ['azul', 'Azul Perolizado', '2022 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelho', '2022 · CG 160 Fan · CBS'],
      ['preta', 'Preto', '2022 · CG 160 Fan · CBS'],
    ]), ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  '2023': {
    CBS: options([
      ['prata', 'Prata Metálico', '2023 · CG 160 Fan · CBS · cor oficial Honda'],
      ['preta', 'Preto', '2023 · CG 160 Fan · CBS · cor oficial Honda'],
      ['vermelha', 'Vermelho Perolizado', '2023 · CG 160 Fan · CBS · cor oficial Honda'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  '2024': {
    CBS: options([
      ['cinza', 'Cinza Metálico', '2024 · CG 160 Fan · CBS'],
      ['preta', 'Preto', '2024 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelho Perolizado', '2024 · CG 160 Fan · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  '2025': {
    CBS: options([
      ['azul', 'Azul Perolizado', '2025 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelho Perolizado', '2025 · CG 160 Fan · CBS'],
      ['preta', 'Preto Metálico', '2025 · CG 160 Fan · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  '2025/2026': {
    ESD: [], ESDD: [], CBS: options([
      ['azul', 'Azul', '2026 · CBS'],
      ['vermelha', 'Vermelha/Preta', '2025/2026 · CBS'],
    ]),
    ABS: options([
      ['cinza', 'Cinza/Preta', '2025/2026 · ABS'],
      ['vermelha', 'Vermelha/Preta', '2025/2026 · ABS'],
    ]),
  },
  '2026': {
    CBS: options([
      ['prata', 'Prata Metálico', '2026 · CG 160 Fan · CBS · nova cor oficial'],
      ['preta', 'Preto Metálico', '2026 · CG 160 Fan · CBS'],
      ['vermelha', 'Vermelho Perolizado', '2026 · CG 160 Fan · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'START-2026': {
    CBS: options([
      ['azul', 'Azul Perolizado', '2026 · CG 160 Start · CBS · Pearl Spencer Blue'],
      ['vermelha', 'Vermelho Perolizado', '2026 · CG 160 Start · CBS'],
      ['preta', 'Preta', '2026 · CG 160 Start · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'START-2022': {
    CBS: options([
      ['prata', 'Prata Metálico', '2022 · CG 160 Start · CBS · Iron Nail Silver Metallic'],
      ['vermelha', 'Vermelha', '2022 · CG 160 Start · CBS'],
      ['preta', 'Preta', '2022 · CG 160 Start · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'START-2015': {
    ES: options([
      ['preta', 'Preta', '2015 · CG 150 Start ES · NH-1 Preto'],
      ['vermelha', 'Vermelha', '2015 · CG 150 Start ES · R-239 Vermelho Guarau'],
    ]),
    ABS: [], CBS: [], ESDD: [], ESD: [], KS: [],
  },
  'CARGO-2013': {
    ESD: options([
      ['branca', 'Branco', '2013 · CG 150 Cargo ESD · ESD · cor única'],
    ]),
    ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'CARGO-2014': {
    ESD: options([
      ['branca', 'Branco', '2014 · CG 150 Cargo ESDi · ESD · cor única'],
    ]),
    ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'CARGO-2015': {
    ESD: options([
      ['branca', 'Branco', '2015 · CG 150 Cargo ESD · ESD · cor única'],
    ]),
    ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'CARGO-2016': {
    ESD: options([
      ['branca', 'Branco', '2016 · CG 160 Cargo ESDi · ESD · cor única'],
    ]),
    ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'CARGO-2017': {
    ESD: options([
      ['branca', 'Branco', '2017 · CG 160 Cargo ESDi · ESD · cor única'],
    ]),
    ABS: [], CBS: [], ESDD: [], ES: [], KS: [],
  },
  'CARGO-2018': {
    CBS: options([
      ['branca', 'Branco', '2018 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2019': {
    CBS: options([
      ['branca', 'Branco', '2019 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2020': {
    CBS: options([
      ['branca', 'Branco', '2020 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2021': {
    CBS: options([
      ['branca', 'Branco', '2021 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2022': {
    CBS: options([
      ['branca', 'Branco', '2022 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2023': {
    CBS: options([
      ['branca', 'Branco', '2023 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2024': {
    CBS: options([
      ['branca', 'Branco', '2024 · CG 160 Cargo · CBS · cor única'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2025': {
    CBS: options([
      ['branca', 'Branco · Supernova White', '2025 · CG 160 Cargo · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'CARGO-2026': {
    CBS: options([
      ['branca', 'Branco · Supernova White', '2026 · CG 160 Cargo · CBS'],
    ]),
    ABS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
  'TITAN-2026': {
    ABS: options([
      ['preta', 'Preto Metálico', '2026 · CG 160 Titan · ABS · Infinite Black Metallic'],
      ['vermelha', 'Vermelho Metálico', '2026 · CG 160 Titan · ABS'],
      ['cinza', 'Cinza Perolizado', '2026 · CG 160 Titan · ABS · Pearl Stark Gray'],
    ]),
    CBS: [], ESDD: [], ES: [], ESD: [], KS: [],
  },
};

export function getColorOptions(year: ModelYear, variant: Variant): BikeColorOption[] {
  return COLOR_OPTIONS[year][variant] ?? [];
}

export function isColorAvailable(year: ModelYear, variant: Variant, color: BikeColor): boolean {
  return getColorOptions(year, variant).some(option => option.id === color);
}

export function normalizeBikeColor(year: ModelYear, variant: Variant, color?: BikeColor): BikeColor {
  if (color && isColorAvailable(year, variant, color)) return color;
  return getColorOptions(year, variant)[0]?.id ?? 'vermelha';
}

export function colorLabel(color: BikeColor): string {
  return ({
    preta: 'Preta',
    vermelha: 'Vermelha',
    branca: 'Branca',
    azul: 'Azul',
    cinza: 'Cinza',
    verde: 'Verde',
    laranja: 'Laranja',
    prata: 'Prata',
  } as Record<BikeColor, string>)[color];
}


function historicalImage(url: string): string {
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&output=webp&q=92`;
}

export function motorcycleImagePath(year: ModelYear, variant: Variant, color: BikeColor): string {
  const safeColor = normalizeBikeColor(year, variant, color);

  // Canonical assets for byte-identical variants avoid storing duplicate images.
  const assetAlias: Partial<Record<ModelYear, Partial<Record<Variant, Partial<Record<BikeColor, string>>>>>> = {
    '2013': {
      ES: { vermelha: 'REMOTE:2013-VERMELHA', preta: 'REMOTE:2013-PRETA', verde: 'REMOTE:2013-VERDE' },
      ESD: { vermelha: 'REMOTE:2013-VERMELHA', preta: 'REMOTE:2013-PRETA', verde: 'REMOTE:2013-VERDE' },
    },
    '2014': { ES: { vermelha: 'https://s3.ecompletocarros.dev/images/lojas/232/veiculos/153813/veiculoInfoVeiculoImagesMobile/vehicle_image_1690835615_47ce73b2cccf86596be2b0f5cbd34d76.jpeg', branca: 'https://1.bp.blogspot.com/-HJgcr86o-_k/UsDIKixQ0fI/AAAAAAAAAKc/xvTzZrAuJPA/s1600/file_62_3.jpg', azul: 'https://4.bp.blogspot.com/-_F3JLtLjt9s/UwIkvGf_4zI/AAAAAAAAAnI/ZX3KhUjuLR0/s1600/Honda-NX-150-Bros-Flex-2014.jpg', preta: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202507/20250721/HONDA-NXR-150-BROS-MIX-ESD-wmimagem14215848624.jpg' }, ESD: { vermelha: 'https://s3.ecompletocarros.dev/images/lojas/232/veiculos/153813/veiculoInfoVeiculoImagesMobile/vehicle_image_1690835615_47ce73b2cccf86596be2b0f5cbd34d76.jpeg', branca: 'https://1.bp.blogspot.com/-HJgcr86o-_k/UsDIKixQ0fI/AAAAAAAAAKc/xvTzZrAuJPA/s1600/file_62_3.jpg', azul: 'https://4.bp.blogspot.com/-_F3JLtLjt9s/UwIkvGf_4zI/AAAAAAAAAnI/ZX3KhUjuLR0/s1600/Honda-NX-150-Bros-Flex-2014.jpg', preta: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202507/20250721/HONDA-NXR-150-BROS-MIX-ESD-wmimagem14215848624.jpg' } },
    // Historical model photos are loaded remotely through a CORS-enabled image proxy.
    // The runtime validates a light/neutral product background, removes it, and
    // normalizes the motorcycle to the same 1536x1024 transparent canvas as local assets.
    '2015': { ESD: { vermelha: 'REMOTE:2015-VERMELHA', branca: 'REMOTE:2015-BRANCA', preta: 'REMOTE:2015-PRETA' }, ESDD: { vermelha: 'REMOTE:2015-VERMELHA', branca: 'REMOTE:2015-BRANCA', preta: 'REMOTE:2015-PRETA' } },
    '2015/2016': { ESDD: { vermelha: 'REMOTE:2015-VERMELHA', branca: 'REMOTE:2015-BRANCA', preta: 'REMOTE:2015-PRETA' } },
    '2016/2017': { ESDD: { vermelha: 'REMOTE:2017-VERMELHA', azul: 'REMOTE:2017-AZUL' }, ES: { preta: 'REMOTE:2017-ES-PRETA', branca: 'REMOTE:2017-ES-BRANCA' } },
    '2017/2018': { ESDD: { vermelha: 'REMOTE:2017-VERMELHA', azul: 'REMOTE:2017-AZUL' }, ES: { preta: 'REMOTE:2017-ES-PRETA', branca: 'REMOTE:2017-ES-BRANCA' } },
    '2017': { ESDD: { vermelha: 'REMOTE:2017-VERMELHA', azul: 'REMOTE:2017-AZUL' }, ES: { preta: 'REMOTE:2017-ES-PRETA', branca: 'REMOTE:2017-ES-BRANCA' } },
    '2018': { CBS: { laranja: '2018-2019/cbs-laranja', vermelha: '2018-2019/cbs-vermelha', azul: '2018-2019/cbs-azul' }, ES: { preta: 'https://img.olx.com.br/images/66/669622856255703.jpg', branca: 'https://img.olx.com.br/thumbs700x500/17/173565597664056.webp' } },
    '2016': {
      ES: { vermelha: 'https://www.motoo.com.br/fotos/2015/11/960_720/honda_NXR_160_Bros_2016_1_17112015_432_960_720.jpg', preta: 'https://www.motoo.com.br/fotos/2015/11/960_720/honda_NXR_160_Bros_2016_1_17112015_433_960_720.jpg' },
      ESDD: {
        vermelha: 'https://www.motoo.com.br/fotos/2015/9/960_720/honda_NXR_160_Bros_2016_1_18092015_203_960_720.jpg',
        branca: 'https://www.motoo.com.br/fotos/2015/9/960_720/honda_NXR_160_Bros_2016_1_18092015_204_960_720.jpg',
        preta: 'https://www.motoo.com.br/fotos/2015/9/960_720/honda_NXR_160_Bros_2016_1_18092015_205_960_720.jpg',
      },
    },
    '2019/2020': {
      CBS: {
        branca: '2019-2020/cbs-branca',
        vermelha: 'REMOTE:2019-VERMELHA-PRETA',
        laranja: 'REMOTE:2019-LARANJA-CINZA',
        azul: 'REMOTE:2019-AZUL-PRETA',
      },
    },
    'NXR-2020': {
      CBS: {
        azul: '2020-2021/cbs-azul',
        preta: '2020-2021/cbs-preta',
        vermelha: '2020-2021/cbs-vermelha',
      },
    },
    'NXR-2021': {
      CBS: {
        preta: '2021-2022/cbs-preta',
        vermelha: '2021-2022/cbs-vermelha',
        azul: '2021-2022/cbs-azul',
      },
    },
    'NXR-2022': {
      CBS: {
        branca: '2022-2023/cbs-branca',
        preta: '2022-2023/cbs-preta',
        vermelha: '2022-2023/cbs-vermelha',
      },
    },
    'NXR-2023': {
      CBS: {
        preta: '2023-2024/cbs-preta',
        vermelha: '2023-2024/cbs-vermelha',
        branca: '2023-2024/cbs-branca',
      },
    },
    'NXR-2024': {
      CBS: {
        preta: '2024-2025/cbs-preta',
        vermelha: '2024-2025/cbs-vermelha',
        branca: '2024-2025/cbs-branca',
      },
    },
    'NXR-2025': {
      CBS: {
        cinza: 'https://www.honda.com.br/motos/sites/hda/files/2024-09/Nova%20Honda%20NXR%20Bros%20160%20ABS%202025%20Cinza%20com%20detalhe%20Verde.webp',
        preta: 'https://www.honda.com.br/motos/sites/hda/files/2024-09/Nova%20Honda%20NXR%20Bros%20160%20CBS%202025%20Preta%20com%20detalhes%20vermelho%20e%20branco.webp',
        vermelha: '2025-2026/cbs-vermelha',
      },
      ABS: {
        preta: 'https://www.honda.com.br/motos/sites/hda/files/2024-09/Nova%20Honda%20NXR%20Bros%20160%20CBS%202025%20Preta%20com%20detalhes%20vermelho%20e%20branco.webp',
        vermelha: '2025-2026/abs-vermelha',
      },
    },
    'NXR-2026': {
      CBS: {
        azul: '2025-2026/cbs-azul',
        vermelha: '2025-2026/cbs-vermelha',
      },
      ABS: {
        cinza: '2025-2026/abs-cinza',
        vermelha: '2025-2026/abs-vermelha',
      },
    },
    '2019': {
      CBS: {
        branca: '2019-2020/cbs-branca',
        vermelha: 'REMOTE:2019-VERMELHA-PRETA',
        laranja: 'REMOTE:2019-LARANJA-CINZA',
        azul: 'REMOTE:2019-AZUL-PRETA',
      },
    },
    '2023/2024': {
      CBS: {
        preta: '2023-2024/cbs-preta',
        vermelha: '2023-2024/cbs-vermelha',
        branca: '2023-2024/cbs-branca',
      },
    },
    '2025/2026': {
      ABS: {
        vermelha: '2025-2026/abs-vermelha',
        cinza: '2025-2026/abs-cinza',
      },
      CBS: {
        vermelha: '2025-2026/cbs-vermelha',
        azul: '2025-2026/cbs-azul',
      },
    },
    'FAN-2013': {
      ESD: {
        preta: 'REMOTE:FAN-2013-PRETA',
        vermelha: 'REMOTE:FAN-2013-VERMELHA',
        cinza: 'REMOTE:FAN-2013-CINZA',
      },
    },
    'FAN-2014': {
      ESD: {
        vermelha: 'REMOTE:FAN-2014-VERMELHA',
        preta: 'REMOTE:FAN-2014-PRETA',
        azul: 'REMOTE:FAN-2014-AZUL',
      },
    },
    'FAN-2015': {
      ESD: {
        vermelha: 'REMOTE:FAN-2015-VERMELHA',
        cinza: 'REMOTE:FAN-2015-CINZA',
        preta: 'REMOTE:FAN-2015-PRETA',
      },
    },
    'FAN-2016': {
      ESD: {
        preta: 'REMOTE:FAN-2016-PRETA',
        vermelha: 'REMOTE:FAN-2016-VERMELHA',
        cinza: 'REMOTE:FAN-2016-CINZA',
      },
    },
    'FAN-2017': {
      CBS: {
        preta: 'REMOTE:FAN-2017-PRETA',
        vermelha: 'REMOTE:FAN-2017-VERMELHA',
      },
    },
    'FAN-2018': {
      CBS: {
        preta: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202603/20260316/hondacg_160_fanwmimagem12153068967.jpg',
        branca: 'https://img.olx.com.br/images/72/726671015634672.jpg',
        vermelha: 'https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202601/20260121/honda-cg-160-fan-wmimagem17570749017.webp',
      },
    },
    'FAN-2019': {
      CBS: {
        preta: 'https://www.autocerto.com/fotos/2777/1481347/1.jpg',
        vermelha: 'https://motonewsbrasil.com/wp-content/uploads/2018/09/honda-cg-160-fan-2019-3-1024x576.jpg',
        cinza: 'https://hondamotoway.com.br/wp-content/uploads/2018/09/CG-Fan-Cinza-Lateral.jpg',
      },
    },
    '2021': {
      CBS: {
        prata: 'https://img.olx.com.br/images/60/608688721751230.jpg',
        preta: 'https://img.olx.com.br/images/59/591649261199131.jpg',
        vermelha: 'https://img.olx.com.br/images/22/221621613005299.jpg',
      },
    },
    '2022': {
      CBS: {
        azul: 'https://motonewsbrasil.com/wp-content/uploads/2021/06/honda-cg-160-fan-2022-azul-1000x667.jpg',
        preta: 'https://motonewsbrasil.com/wp-content/uploads/2021/06/honda-cg-160-fan-2022-8.jpg',
        vermelha: 'https://motonewsbrasil.com/wp-content/uploads/2021/06/honda-cg-160-fan-2022-9.jpg',
      },
    },
    '2023': {
      CBS: {
        prata: 'https://motonewsbrasil.com/wp-content/uploads/2022/08/honda-cg-160-fan-2023-prata-1.jpg',
        preta: 'https://motonewsbrasil.com/wp-content/uploads/2022/08/honda-cg-160-fan-2023-preta-3.jpg',
        vermelha: 'https://www.motoragora.com.br/wp-content/uploads/2022/06/cg-160-fan-2023-cor-vermelha-1024x576.png',
      },
    },
    '2024': {
      CBS: {
        cinza: 'https://www.honda.com.br/motos/sites/hda/files/2023-10/motocicleta-honda-cg-160-fan-2024-cinza-metalico.webp',
        preta: 'https://production.autoforce.com/uploads/version/profile_image/11876/model_middle_webp_comprar-preto-metalico-infinite-black-metallic_bcc9796230.png.webp',
        vermelha: 'https://production.autoforce.com/uploads/version/profile_image/11875/model_middle_webp_comprar-vermelho-perolizado-pearl-marrakesh-red_38d971ef77.png.webp',
      },
    },
    '2025': {
      CBS: {
        azul: 'https://www.honda.com.br/motos/sites/hda/files/2024-10/motocicleta-cg-160-fan-em-azul-e-preto.webp',
        vermelha: 'https://production.autoforce.com/uploads/version/profile_image/11875/model_middle_webp_comprar-vermelho-perolizado-pearl-marrakesh-red_38d971ef77.png.webp',
        preta: 'https://production.autoforce.com/uploads/version/profile_image/11876/model_middle_webp_comprar-preto-metalico-infinite-black-metallic_bcc9796230.png.webp',
      },
    },
    '2026': {
      CBS: {
        prata: 'https://www.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Fan-Prata-Met%C3%A1lico.webp',
        preta: 'https://www.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Fan-Preto-Met%C3%A1lico.webp',
        vermelha: 'https://www.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Fan-Vermelho-Perolizado.webp',
      },
    },
    'START-2026': {
      CBS: {
        azul: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-home-visao-da-lateral-direita-da-honda-cg-160-start.webp',
        preta: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Start-Preto.webp',
        vermelha: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Start-Vermelho-Perolizado_0.webp',
      },
    },
    'START-2022': {
      CBS: {
        preta: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Start-Preto.webp',
        vermelha: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Start-Vermelho-Perolizado_0.webp',
      },
    },
    'START-2015': {
      ES: {
        preta: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Start-Preto.webp',
        vermelha: 'https://hml.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Start-Vermelho-Perolizado_0.webp',
      },
    },
    'CARGO-2013': {
      ESD: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2014': {
      ESD: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2015': {
      ESD: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2016': {
      ESD: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2017': {
      ESD: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2018': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2019': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2020': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2021': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2022': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2023': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2024': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'CARGO-2025': {
      CBS: {
        branca: 'https://hml.honda.com.br/motos/sites/hda/files/2024-10/lateral-nova-motocicleta-honda-cargo-2025-prata-e-preto.webp',
      },
    },
    'CARGO-2026': {
      CBS: {
        branca: 'https://updev2.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-CG%20160-Cargo-Branco.webp',
      },
    },
    'TITAN-2026': {
      ABS: {
        preta: 'https://www.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Titan-Preto-Met%C3%A1lico.webp',
        vermelha: 'https://www.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Titan-Vermelho-Met%C3%A1lico.webp',
        cinza: 'https://www.honda.com.br/motos/sites/hda/files/2025-08/Imagem-Home-Honda-CG-160-Titan-Cinza-Met%C3%A1lico.webp',
      },
    },
  };

  // CG 160 Fan 2021–2023: reviewed real sources routed through the shared
  // historical proxy so the transparent-background normalization always runs.
  // CG 160 Fan 2020: use concrete original image sources for each of the three official colors.
  // This avoids the missing-asset path that previously led to the visual fallback.
  if (year === '2020' && variant === 'CBS') {
    const fan2020: Partial<Record<BikeColor, string>> = {
      // Studio/press sources reviewed against the user’s framing requirements.
      prata: 'https://motonewsbrasil.com/wp-content/uploads/2019/08/honda-cg-160-fan-2020-2-1024x683.jpg',
      vermelha: 'https://motonewsbrasil.com/wp-content/uploads/2019/08/honda-cg-160-fan-2020-7.jpg',
      preta: 'https://media.integradordeanuncios.com.br/media/fotos-webp/410/418326-honda-cg-160-fan-20260316092921954125.webp',
    };
    if (fan2020[safeColor]) return historicalImage(fan2020[safeColor]!);
  }

  if (year === '2021' && variant === 'CBS') {
    const fan2021: Partial<Record<BikeColor, string>> = {
      prata: 'https://img.olx.com.br/images/60/608688721751230.jpg',
      preta: 'https://img.olx.com.br/images/59/591649261199131.jpg',
      vermelha: 'https://img.olx.com.br/images/22/221621613005299.jpg',
    };
    if (fan2021[safeColor]) return historicalImage(fan2021[safeColor]!);
  }
  if (year === '2022' && variant === 'CBS') {
    const fan2022: Partial<Record<BikeColor, string>> = {
      azul: 'https://motonewsbrasil.com/wp-content/uploads/2021/06/honda-cg-160-fan-2022-azul-1000x667.jpg',
      preta: 'https://motonewsbrasil.com/wp-content/uploads/2021/06/honda-cg-160-fan-2022-8.jpg',
      vermelha: 'https://motonewsbrasil.com/wp-content/uploads/2021/06/honda-cg-160-fan-2022-9.jpg',
    };
    if (fan2022[safeColor]) return historicalImage(fan2022[safeColor]!);
  }
  if (year === '2023' && variant === 'CBS') {
    const fan2023: Partial<Record<BikeColor, string>> = {
      prata: 'https://motonewsbrasil.com/wp-content/uploads/2022/08/honda-cg-160-fan-2023-prata-1.jpg',
      preta: 'https://motonewsbrasil.com/wp-content/uploads/2022/08/honda-cg-160-fan-2023-preta-3.jpg',
      vermelha: 'https://www.motoragora.com.br/wp-content/uploads/2022/06/cg-160-fan-2023-cor-vermelha-1024x576.png',
    };
    if (fan2023[safeColor]) return historicalImage(fan2023[safeColor]!);
  }

  const aliased = assetAlias[year]?.[variant]?.[safeColor];

  // CG 150 Fan ESDi 2013: concrete historical photos, always routed through the
  // same CORS-safe historical proxy so the transparent-background pipeline can run
  // instead of falling back to the generic missing-photo state.
  if (aliased === 'REMOTE:FAN-2013-PRETA') return historicalImage('https://img.olx.com.br/images/54/547698733530857.jpg');
  if (aliased === 'REMOTE:FAN-2013-VERMELHA') return historicalImage('https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202601/20260109/hondacg_150_fan_esiwmimagem08353158122.jpg');
  if (aliased === 'REMOTE:FAN-2013-CINZA') return historicalImage('https://image.webmotors.com.br/_fotos/anunciousados/gigante/2026/202602/20260212/hondacg_150_fan_esdiwmimagem10262305021.jpg');

  // CG 150 Fan ESDi 2014: concrete historical photos, always routed through the
  // same CORS-safe historical proxy used by the older Fan entries. This keeps the
  // background-removal pipeline active instead of falling back to a missing-photo state.
  if (aliased === 'REMOTE:FAN-2014-VERMELHA') return historicalImage('https://img.olx.com.br/images/68/687529467194262.jpg');
  if (aliased === 'REMOTE:FAN-2014-PRETA') return historicalImage('https://img.olx.com.br/images/49/495675481515725.jpg');
  if (aliased === 'REMOTE:FAN-2014-AZUL') return historicalImage('https://www.encontracarros.com.br/upload/honda-motos/nova-honda-cg-2014-fan-150.jpg');

  // CG 160 Fan 2015: real historical photos, always routed through the CORS-safe
  // historical proxy so the background-removal path can run instead of falling
  // back to the generic visual fallback.
  if (aliased === 'REMOTE:FAN-2015-VERMELHA') return historicalImage('https://www.supertopmotor.com.br/wp-content/uploads/2015/12/11081509314828.jpg');
  if (aliased === 'REMOTE:FAN-2015-CINZA') return historicalImage('https://http2.mlstatic.com/D_771394-MLB81499369370_012025-C.jpg');
  if (aliased === 'REMOTE:FAN-2015-PRETA') return historicalImage('https://img.olx.com.br/images/47/479687860142623.jpg');

  // CG 160 Fan 2016: real historical photos, always routed through the CORS-safe
  // historical proxy so the background-removal path can run instead of falling
  // back to the generic visual fallback state.
  if (aliased === 'REMOTE:FAN-2016-PRETA') return historicalImage('https://3.bp.blogspot.com/-4F8exIsnndc/V6UfInmF3kI/AAAAAAACbZs/RBn_-iTcWCsLPswczBl8tVyZa7MBhSQSQCLcB/s1600/Honda-CG-160-fan-2017-preta.jpg');
  if (aliased === 'REMOTE:FAN-2016-VERMELHA') return historicalImage('https://img.olx.com.br/images/77/772628363559448.jpg');
  if (aliased === 'REMOTE:FAN-2016-CINZA') return historicalImage('https://3.bp.blogspot.com/-UUW23W8bwag/Vb-oAWAPuvI/AAAAAAACMgQ/PeCOTQnFGvM/s1600/Honda_CG%2B160%2BFan%2B2016%2B%2B3_4traseira.jpg');

  if (aliased === 'REMOTE:FAN-2017-PRETA') return historicalImage('https://3.bp.blogspot.com/-4F8exIsnndc/V6UfInmF3kI/AAAAAAACbZs/RBn_-iTcWCsLPswczBl8tVyZa7MBhSQSQCLcB/s1600/Honda-CG-160-fan-2017-preta.jpg');
  if (aliased === 'REMOTE:FAN-2017-VERMELHA') return historicalImage('https://www.encontracarros.com.br/upload/honda-motos/honda-cg-160-fan_2017_02.jpg');
  if (aliased === 'REMOTE:2013-VERMELHA') return historicalImage('https://www.motonline.com.br/noticia/wp-content/uploads/2021/03/Honda-NXR-150-Bros-2013.jpg');
  if (aliased === 'REMOTE:2013-PRETA') return historicalImage('https://img.olx.com.br/images/29/290674496180864.jpg');
  if (aliased === 'REMOTE:2013-VERDE') return historicalImage('https://catarina-prd.s3.sa-east-1.amazonaws.com/b261837f50e9f152ff745a2abcacf5bf.webp');
  if (aliased === 'REMOTE:2015-VERMELHA') return historicalImage('https://cdn.motor1.com/images/mgl/Pqx42/s3/honda-apresenta-nxr-bros-2015-com-novo-motor-de-160-cc.jpg');
  if (aliased === 'REMOTE:2015-BRANCA') return historicalImage('https://2.bp.blogspot.com/-Qww7BKfKiL8/VGJKcvcc56I/AAAAAAAAVVM/VQ2aD-EjByM/s1600/2D8A4645LR.jpg');
  if (aliased === 'REMOTE:2015-PRETA') return historicalImage('https://www.motorede.com.br/wp-content/uploads/2014/11/Nova-Honda-NRX-160-Bros-2015-7-600x400.jpg');
  if (aliased === 'REMOTE:2017') return historicalImage('https://comprecar.com.br/storage/news/featured/Zi2ECMFt4cM5B32.jpg');
  if (aliased === 'REMOTE:2017-VERMELHA') return historicalImage('https://carroonline.terra.com.br//motociclismoonline/staticcontent/images/uploads/honda_bros_160_2017_vermelha_620x467.jpg');
  if (aliased === 'REMOTE:2017-AZUL') return historicalImage('https://cdn.motor1.com/images/mgl/qeXoR/s3/honda-nxr-160-bros-2017-chega-com-novas-cores-e-preco-inicial-de-r-9990.jpg');
  if (aliased === 'REMOTE:2017-ES-PRETA') return historicalImage('https://www.motoo.com.br/fotos/2015/9/960_720/honda_NXR_160_Bros_2016_1_18092015_205_960_720.jpg');
  if (aliased === 'REMOTE:2017-ES-BRANCA') return historicalImage('https://www.motoo.com.br/fotos/2015/9/960_720/honda_NXR_160_Bros_2016_1_18092015_204_960_720.jpg');
  if (aliased === 'REMOTE:2019-VERMELHA-PRETA') return historicalImage('https://www.motoo.com.br/fotos/2018/9/1280_960/honda_nxr-160_2019_1_25092018_2208_1280_960.jpg');
  if (aliased === 'REMOTE:2019-LARANJA-CINZA') return historicalImage('https://www.motorede.com.br/wp-content/uploads/2018/09/Bros-160-2019-preco-laranja-04-900x600.jpg');
  if (aliased === 'REMOTE:2019-AZUL-PRETA') return historicalImage('https://www.motoo.com.br/fotos/2018/9/1280_960/honda_nxr-160_2019_3_25092018_2210_1280_960.jpg');
  if (typeof aliased === 'string' && aliased.startsWith('http')) return historicalImage(aliased);
  if (aliased) {
    const assetName = aliased.replace(/\//g, '-');
    return `${import.meta.env.BASE_URL}images/motorcycles/bros-${assetName}.webp`;
  }

  const safeYear = year.replace('/', '-');
  return `${import.meta.env.BASE_URL}images/motorcycles/bros-${safeYear}-${variant.toLowerCase()}-${safeColor}.webp`;
}
