declare module 'byte-size' {
  export default function(
    value: number, 
    options?: { units?: string; precision?: number }
  ): { value: number; unit: string }
}