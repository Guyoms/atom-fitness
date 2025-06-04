"use client";
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@heroui/react";
import { useApp } from "../../context/AppContext";

interface AddMealModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddMealModal({ isOpen, onOpenChange }: AddMealModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Ajouter un repas personnalisé</ModalHeader>
        <ModalBody>
          {/* Formulaire d'ajout de repas */}
        </ModalBody>
        <ModalFooter>
          <Button onPress={() => onOpenChange(false)}>Fermer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 