const input = '20546C8802538E136091C1802689BCD7DA45948D319D1B100747A009C97696E8B4ABFCA6AB8F4F26C401964A6271C80F802D392C01CEDDCE6E5CB829802F600A00021B14E34C361006E0AC418BB2CA6800BE4599BB6A73507002A52BEEB14D201802F600849E64D3369D37C74100866785B3D0ADFD8E601E5EB9DE2366D93ECB8B040142CB8ACE07CCB5CF34CA89380410B6134CE6FEF104A2B200243396976A00401A45004313D68435DBDDDA61CE6428C01491AEBF0C7E580AE00CCC401B86514216880370EE3443D2013DF003750004361343D88800084C4C8B116A679018300740010C8571BA32080350DA0D42800043A3044189AE0174B314D76E1F3ACF3BDAE3EE7298FF134002EF9DBCD0644127E3CAE7FCBA9A80393544F9A927C973DF1A500965A5CEA94C4DDA5658B94C6C3002A798A629CF21280532BAB4F4C7271E45EE6E71D8143A9BC7948804AB94D1D6006AC200EC1E8A10C00010985316A35C3620061E641644D661A4C012993E99208FC60097802F28F528F738606008CA47205400814C89CC8890064D400AB4BE0A66F2BF253E73AE8401424A7BFB16C0037E06CE0641E0013B08010A8930CE2B980351161DC3730066274188B020054A5E16965940057895ADEB5BF56A635ADE2354191D70566273A6F5B078266008D8022200D46E8291C4401A8CF0CE33CEDE55E9F9802BA00B4BD44A5EA2D10CC00B40316800BAE1003580A6D6026F00090E50024007C9500258068850035C00A4012ED8040B400D71002AF500284009700226336CA4980471D655E25D4650888023AB00525CAE5CBA5E428600BE003993778CB4732996E9887AE3F311C291004BD37517C0041E780A7808802AF8C1C00D0CDBE4ACAD69B3B004E13BDF23CAE7368C9F62448F64546008E0034F3720192A67AD9254917454200DCE801C99ADF182575BBAACAC7F8580';

const HEX_2_BIN = new Map([['0', '0000'], ['1', '0001'], ['2', '0010'], ['3', '0011'], ['4', '0100'], ['5', '0101'], ['6', '0110'], ['7', '0111'], ['8', '1000'], ['9', '1001'], ['a', '1010'], ['b', '1011'], ['c', '1100'], ['d', '1101'], ['e', '1110'], ['f', '1111'], ['A', '1010'], ['B', '1011'], ['C', '1100'], ['D', '1101'], ['E', '1110'], ['F', '1111']]);

// day 16 part 1
function hexToBinaryStr(hexStr) {
  let buffer = '';
  for (const hex of hexStr) buffer += HEX_2_BIN.get(hex);
  return buffer;
}

function parseBinaryStr(binaryStr, i) {
  const startAt = i;

  const packet = {};
  // the first three bits encode the packet version
  packet.version = parseInt(binaryStr[i++] + binaryStr[i++] + binaryStr[i++], 2);
  // the next three bits encode the packet type
  packet.type = parseInt(binaryStr[i++] + binaryStr[i++] + binaryStr[i++], 2);
  // parse literal value (packet type 4)
  if (packet.type == 4) {
    let bitsBuffer = '';
    while (binaryStr[i++] == '1') {
      bitsBuffer += binaryStr[i++] + binaryStr[i++] + binaryStr[i++] + binaryStr[i++];
    }
    bitsBuffer += binaryStr[i++] + binaryStr[i++] + binaryStr[i++] + binaryStr[i++];
    packet.value = parseInt(bitsBuffer, 2);
  // other packets are operators
  } else {
    packet.lengthType = parseInt(binaryStr[i++], 2);
    // lengthType 0 indicates that the length is a 15-bit number representing the number of bits in the sub-packets
    if (packet.lengthType == 0) {
      let lengthBuffer = '';
      for (let cpt = 0; cpt < 15; cpt++) {
        lengthBuffer += binaryStr[i++];
      }
      packet.lengthVal = parseInt(lengthBuffer, 2);
      packet.subPackets = [];
      let subStart = i;
      while (i - subStart < packet.lengthVal) {
        let subPackets = parseBinaryStr(binaryStr, i);
        i = subPackets.i;
        packet.subPackets.push(subPackets.packet);
      }
    // lengthType 1 indicates that the length is a 11-bit number representing the number of sub-packets
    } else {
      let lengthBuffer = '';
      for (let cpt = 0; cpt < 11; cpt++) {
        lengthBuffer += binaryStr[i++];
      }
      packet.subPackets = [];
      packet.nbSubPackets = parseInt(lengthBuffer, 2);
      for (let n=0; n<packet.nbSubPackets; n++) {
        let subPackets = parseBinaryStr(binaryStr, i);
         i = subPackets.i;
         packet.subPackets.push(subPackets.packet);
      }
    }
  }
  if (!packet.value) {
    let value;
    switch (packet.type) {
      case 0: // sum
        value = 0;
        for (const subPack of packet.subPackets) value += subPack.value;
        break;
      case 1: // product
        value = 1;
        for (const subPack of packet.subPackets) value *= subPack.value;
        break;
      case 2: // minimum
        let min = Infinity;
        for (const subPack of packet.subPackets) {
          if (subPack.value < min) min = subPack.value;
        }
        value = min;
        break;
      case 3: // maximum
        let max = -Infinity;
        for (const subPack of packet.subPackets) {
          if (subPack.value > max) max = subPack.value;
        }
        value = max;
        break;
      case 5: // greater than
        value = packet.subPackets[0].value > packet.subPackets[1].value ? 1 : 0;
        break;
      case 6: // less than
        value = packet.subPackets[0].value < packet.subPackets[1].value ? 1 : 0;
        break;
      case 7: // equal to
        value = packet.subPackets[0].value == packet.subPackets[1].value ? 1 : 0;
        break;
    }
    packet.value = value;
  }
  sumVersion += packet.version;
  return {packet, i};
}

const binaryStr = hexToBinaryStr(input);
let i = 0;
let sumVersion = 0;
let data = parseBinaryStr(binaryStr, i);
console.log(sumVersion);

// day 16 part 2
console.log(data.packet.value);
